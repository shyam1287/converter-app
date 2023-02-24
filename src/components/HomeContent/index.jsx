import React from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Page,
  PageContent,
  RadioButtonGroup,
  TextInput
} from 'grommet';
import { FX_EUR, fxMap } from '../../constants/fx';
import getRandomNumber from '../../helpers/getRandomNumber';
import DataTable from '../DataTable';
import { shouldDisableOverride } from '../../helpers/override';
import { Toaster, toast } from 'react-hot-toast';
import { convertAmount } from '../../constants/covertAmount';

const defaultValue = {
  currency: 'eur',
  fx: FX_EUR,
  amountToConvert: 0,
  isOverride: false,
  overrideBy: FX_EUR
};

const HomeContent = () => {
  const [formState, setFormState] = React.useState(defaultValue);
  const [data, setData] = React.useState([]);

  const handleSubmit = ({ value }) => {
    if (!value.amountToConvert || +value.amountToConvert === 0)
      return toast.error('Please enter a correct amount to convert!', {
        duration: 6000
      });

    const disableOverride = shouldDisableOverride(value.fx, value.overrideBy);
    if (disableOverride)
      setFormState((prev) => ({ ...prev, isOverride: disableOverride }));

    const newOverride = disableOverride ? false : value.isOverride;

    const convertedAmount = convertAmount(
      value.amountToConvert,
      newOverride ? value.overrideBy : value.fx
    );

    const item = {
      fx: value.fx,
      originalAmount: `${value.amountToConvert} ${
        value.currency === 'usd' ? 'EUR' : 'USD'
      }`,
      convertedAmount: `${convertedAmount.toFixed(
        2
      )} ${value.currency.toUpperCase()}`,
      override: newOverride && value.overrideBy
    };
    setData((prev) => [...(prev.length > 4 ? prev.slice(-4) : prev), item]);
    toast.success(
      newOverride
        ? `New Entry added using override: ${value.overrideBy}`
        : `New Entry added with FX: ${value.fx}`,
      {
        duration: 6000
      }
    );
  };

  /*
   * func
   * @returns {void}
   */
  const updateFx = React.useCallback(() => {
    const randomNo = getRandomNumber();
    setFormState((prev) => ({
      ...prev,
      fx: (fxMap[formState.currency] + randomNo).toFixed(2)
    }));
  }, [formState]);

  React.useEffect(() => {
    const interval = setInterval(updateFx, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [updateFx]);

  return (
    <Page kind="narrow">
      <Toaster position="bottom-left" />
      <PageContent
        background="brand"
        pad={'16px'}
        margin={{ top: '12px' }}
        round
      >
        <Form
          value={formState}
          onChange={(nextValue) =>
            setFormState({
              ...nextValue,
              fx: fxMap[nextValue.currency],
              currency: nextValue.currency
            })
          }
          onReset={() => setFormState({})}
          onSubmit={handleSubmit}
        >
          <FormField name="fx" htmlFor="fx-input" label="FX">
            <TextInput id="fx-input" name="fx" disabled />
          </FormField>
          <Box margin={{ vertical: '16px' }}>
            <FormField
              label="Currency"
              name="currency"
              component={RadioButtonGroup}
              pad={true}
              options={[
                {
                  label: 'EUR',
                  value: 'eur',
                  id: 'eur-radio'
                },
                {
                  label: 'USD',
                  value: 'usd',
                  id: 'usd-radio'
                }
              ]}
            />
          </Box>
          <FormField
            name="amountToConvert"
            htmlFor="amountToConvert-input"
            label="Amount to convert"
          >
            <TextInput id="amountToConvert-input" name="amountToConvert" />
          </FormField>
          <FormField
            name="isOverride"
            component={CheckBox}
            pad={true}
            label="Override"
          />
          {formState.isOverride && (
            <FormField
              name="overrideBy"
              htmlFor="overrideBy-input"
              label="Override By"
            >
              <TextInput id="overrideBy-input" name="overrideBy" />
            </FormField>
          )}
          <Box
            direction="row"
            gap="medium"
            margin={{ bottom: '8px', top: '24px' }}
          >
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      </PageContent>
      {data.length ? (
        <PageContent
          background="brand"
          pad={'16px'}
          margin={{ top: '12px' }}
          round
        >
          <DataTable data={data} />
        </PageContent>
      ) : null}
    </Page>
  );
};

export default HomeContent;
