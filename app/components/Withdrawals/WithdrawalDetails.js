import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Heading } from '../../containers/MyProfile/myProfile';

import {
  getBankDetails,
  getBankDetailsByCharityId,
} from '../../utils/crud/bankDetail.crud';
import { shallowEqual, useSelector } from 'react-redux';
import BankDetailsCard from './BankDetailsCard';
import WithdrawalForm from './WithdrawalForm';
import WithdrawalHistory from './WithdrawalHistory';
import {
  getWithdrawal,
  getWithdrawalHistory,
} from '../../utils/crud/withdrawal.crud';

const WithdrawalDetails = () => {
  const { myCharityProfile } = useSelector(
    ({ charity }) => ({
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );
  const [personalAccountDetails, setPersonalAccountDetails] = useState(null);
  const [charityAccountDetails, setCharityAccountDetails] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);

  const [perPage, setPerPage] = useState(5);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PerPage = useCallback(event => {
    setPerPage(event.target.value);
  }, []);
  const handleChangePage = useCallback((event, value) => {
    setPageNo(value);
  }, []);
  useEffect(() => {
    getBalance();
    if (myCharityProfile?.id) {
      getBankDetailsByCharityId(myCharityProfile?.id)
        .then(({ data }) => {
          setCharityAccountDetails(data.response?.data?.res[0] || null);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getBankDetails()
      .then(({ data }) => {
        setPersonalAccountDetails(data.response?.data?.res);
        setSelectedAccount(data.response?.data?.res);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);
  useEffect(() => {
    console.log('history');
    setLoadingHistory(true);
    getHistory({ pageNo, perPage });
  }, [perPage, pageNo]);
  const selectAccount = type => event => {
    event.stopPropagation();
    if (type === 'Charity Account') {
      setSelectedAccount(charityAccountDetails);
    } else {
      setSelectedAccount(personalAccountDetails);
    }
  };
  const getBalance = refresh => {
    console.log('balance');
    if (refresh) {
      setLoadingHistory(true);
      getHistory({ pageNo, perPage });
    }
    getWithdrawal()
      .then(({ data }) => {
        setBalance(data?.response?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getHistory = params => {
    getWithdrawalHistory(params)
      .then(({ data }) => {
        console.log('data', data);
        setLoadingHistory(false);
        setWithdrawalHistory(data?.response?.data?.withdrawalHistory);
        setTotalPages(data?.response?.data?.totalCount);
      })
      .catch(err => {
        setLoadingHistory(false);
        console.log(err);
      });
  };
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  });
  return (
    <div>
      <Row>
        <Col xs={12} sm={6} className="py-2 pr-5">
          <Heading>Bank Details</Heading>
          <BankDetailsCard
            accountType="Personal Account"
            accountNumber={personalAccountDetails?.accountNo}
            accountHolderName={personalAccountDetails?.accountName}
            sortCode={personalAccountDetails?.sortCode}
            active={!Boolean(selectedAccount?.charityId)}
            selectAccount={selectAccount}
          />
          {myCharityProfile && (
            <BankDetailsCard
              accountType="Charity Account"
              accountNumber={charityAccountDetails?.accountNo}
              accountHolderName={charityAccountDetails?.accountName}
              sortCode={charityAccountDetails?.sortCode}
              active={Boolean(selectedAccount?.charityId)}
              selectAccount={selectAccount}
            />
          )}
        </Col>
        <Col xs={12} sm={6}>
          <div className="d-flex justify-content-between account-details__balance ">
            <div className="text-center">
              <div className="account-details-card__heading">
                Total Available Balance
              </div>
              <div className="account-details__amount my-2">
                {formatter.format(
                  (selectedAccount?.charityId
                    ? balance?.charityInfo?.AvailableBalance / 100
                    : balance?.accountInfo?.AvailableBalance / 100) || 0,
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="account-details-card__heading">
                Total Withdrawals
              </div>
              <div className="account-details__amount my-2">
                {formatter.format(
                  (selectedAccount?.charityId
                    ? balance?.charityTotalWithdrawal / 100
                    : balance?.accountTotalWithdrawal / 100) || 0,
                )}
              </div>
            </div>
          </div>
          <WithdrawalForm
            selectedAccount={selectedAccount}
            getBalance={getBalance}
          />
        </Col>
      </Row>
      <hr />
      <WithdrawalHistory
        withdrawalHistory={withdrawalHistory}
        pageNo={pageNo}
        handleChangePage={handleChangePage}
        totalPages={totalPages}
        perPage={perPage}
        PerPage={PerPage}
        loading={loadingHistory}
      />
    </div>
  );
};

export default React.memo(WithdrawalDetails);