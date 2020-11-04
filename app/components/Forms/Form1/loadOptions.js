import React from "react";
import { Field } from "formik";
import { AsyncPaginate } from "react-select-async-paginate";
import { getParentCampaigns } from '../../../utils/campaigns-utilities/getCampaignsUtilites';
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
                            placeholder='Select Parent Class'
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
export default InputDesign;