import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form: React.FC = () => {
  const { tg } = useTelegram();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [sex, setSex] = useState<string>('female');

  const onSendData = useCallback(() => {
    const data = {
      name,
      email,
      sex,
    };

    tg.sendData(JSON.stringify(data));
  }, [email, name, sex]); // eslint-disable-line

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);

    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]); // eslint-disable-line

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Submit',
    });
  }, []);

  useEffect(() => {
    if (!name || !email) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [name, email]); // eslint-disable-line

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangeSex = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSex(e.target.value);
  };

  return (
    <div className="form">
      <h3>Form</h3>

      <form className="form">
        <label htmlFor="name">Name</label>
        <input
          className="input"
          id="name"
          type="text"
          value={name}
          onChange={onChangeName}
          placeholder='e.g. "John Doe"'
        />

        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="e.g. jondoe@gmail.com"
        />

        <select className={'select'} value={sex} onChange={onChangeSex}>
          <option value={'female'}>Female</option>
          <option value={'male'}>Male</option>
        </select>

        {/* <label htmlFor="message">Message</label>
        <textarea name="message" id="message" cols={30} rows={10}></textarea> */}
      </form>
    </div>
  );
};

export default Form;
