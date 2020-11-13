import React from 'react';
import { MoreVert } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { conformToMask } from 'react-text-mask';

const BankDetailsCard = ({
  accountHolderName,
  sortCode,
  accountNumber,
  accountType,
  selectAccount,
  active,
}) => (
    <Tooltip
      title="Click to select Account"
      placement="top"
      onClick={selectAccount(accountType)}
    >
      <div
        className={`account-details-card mt-4 position-relative ${active ? 'account-details-card-active' : ''
          }`}
      >
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="text-primary account-details-card__name">
            {accountHolderName || 'N/A'}
          </div>
          <button className="btn btn-icon p-0">
            <MoreVert />
          </button>
        </div>

        <div className="account-details-card__heading">Account Number</div>
        <div className="text-muted account-details-card__sort-code">
          {accountNumber || 'N/A'}
        </div>
        <div className="account-details-card__heading">Sort Code</div>
        <div className="text-muted account-details-card__sort-code">
          {
            conformToMask(sortCode, [
              /\d/,
              '-',
              /\d/,
              '-',
              /\d/,
              '-',
              /\d/,
            ])?.conformedValue 
          }
        </div>
        <div className="d-flex align-items-center justify-content-end ">
          <div className="account-details-card__badge ">{accountType}</div>
        </div>
      </div>
    </Tooltip>
  );

export default BankDetailsCard;
