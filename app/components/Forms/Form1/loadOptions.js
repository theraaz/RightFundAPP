import React from "react";
import { Field } from "formik";
import { AsyncPaginate } from "react-select-async-paginate";
import { getParentCampaigns } from '../../../utils/campaigns-utilities/getCampaignsUtilites';
// import { getCharities } from '../../../utils/charity-utilities//getCharityUtilites';
import './form1.scss';

const InputDesign = ({ edit }) => {
    async function loadOptions(search, loadedOptions, { page }) {
        const res = await getParentCampaigns({
            q: search,
            pageNo: page,
            perPage: 5
        });
        const options = res.data.response.data.parentCampaignsRes.map(campaigns => ({
            value: campaigns.parentCampaignId,
            label: campaigns.title
        }));
        return {
            options: options,
            hasMore: loadedOptions.length + options.length < res.data?.response.data.totalCount,
            additional: {
                page: page + 1
            }
        };
    }
    return (
        <Field>
            {({ form: { setFieldValue, values } }) => {
                const onChange = value => {
                    setFieldValue("parentCampaign", value.value || "");
                };
                return (
                    <>
                        <AsyncPaginate
                            isDisabled={edit}
                            classNamePrefix='filter'
                            placeholder='Raising for someone else? Choose here'
                            value={
                                values.parentCampaign ? {
                                    value: values.parentCampaign.id,
                                    label: values.parentCampaign.title
                                } : null}
                            loadOptions={loadOptions}
                            onChange={onChange}
                            additional={{
                                page: 1
                            }}
                        />
                    </>
                );
            }}
        </Field>
    );
};

// const CharityInputDesign = ({ edit }) => {
//     async function loadOptions(search, loadedOptions, { page }) {
//         const res = await getCharities({
//             q: search,
//             pageNo: page,
//             perPage: 5
//         });
//         const options = res.data.response.data.res.map(charities => ({
//             value: charities.charityId,
//             label: charities.charityId.name
//         }));
//         return {
//             options: options,
//             hasMore: loadedOptions.length + options.length < res.data?.response.data.count,
//             additional: {
//                 page: page + 1
//             }
//         };
//     }
//     return (
//         <Field>
//             {({ form: { setFieldValue, values } }) => {
//                 console.log('herer', values);
//                 const onChange = value => {
//                     setFieldValue("charities", value.value || "");
//                 };
//                 return (
//                     <>
//                         <AsyncPaginate
//                             isDisabled={edit}
//                             classNamePrefix='filter'
//                             placeholder='Raising for Specific Charity'
//                             value={
//                                 values.charities ? {
//                                     value: values.charities.id,
//                                     label: values.charities.name
//                                 } : null}
//                             loadOptions={loadOptions}
//                             onChange={onChange}
//                             additional={{
//                                 page: 1
//                             }}
//                         />
//                     </>
//                 );
//             }}
//         </Field>
//     );
// };
export {
    InputDesign,
    // CharityInputDesign
};