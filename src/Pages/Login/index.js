import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Input, Button, Select, Checkbox } from 'antd';
import { useHistory } from 'react-router';

import { HOME } from '../../router/router';
import FieldError from '../../components/FieldError';
import { login, getMachineId } from '../../redux/actions/homeAction';
import { APP_ROLE, LOCAL_STORAGE } from '../../constants/common';

const Login = ({ handleLogin, handleGetListMachine, homeReducer }) => {
  const { listMachine, loadingMachineList, loginFailed } = homeReducer;
  const [machine, setMachine] = useState('');
  const history = useHistory();
  const [selectedMachineError, setSelectedMachineError] = useState(false);
  const [roleCheck, setRoleCheck] = useState(true);
  const [wrongPassword, setWrongPassword] = useState('');

  useEffect(() => {
    if (
      localStorage.getItem(LOCAL_STORAGE.session_id) &&
      localStorage.getItem(LOCAL_STORAGE.session_id) !== 'undefined'
    ) {
      history.push(HOME);
    }
    handleGetListMachine();
  }, []);

  useEffect(() => {
    if (loginFailed?.state) {
      setWrongPassword('Your password is wrong');
    }
  }, [loginFailed?.renderId]);

  useEffect(() => {
    machine && setSelectedMachineError(false);
  }, [machine]);

  const { Option } = Select;
  const formValidateSchema = yup.object().shape({
    password: yup.string().required('Please input password'),
    selectedMachine: yup
      .mixed()
      .test('testSelectedMachine', 'Please select the machine', () => {
        if (machine) {
          setSelectedMachineError(false);
          return true;
        }
        setSelectedMachineError(true);
        return false;
      }),
  });

  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(formValidateSchema),
  });

  const { errors } = useFormState({
    control,
  });

  const onCheck = (event) => {
    setRoleCheck(event.target.checked);
  };

  const submitLogin = (data) => {
    handleLogin(
      {
        mid: machine,
        pswd: data.password,
        role: roleCheck ? APP_ROLE.SUPERVISOR : APP_ROLE.MANAGER,
      },
      () => {
        history.push(HOME);
      },
    );
  };

  return (
    <div className="d-flex flex-column width-100-per align-items-center justify-content-center height-100-per login-form-container">
      <Form
        className="login-form p-a-20 d-flex flex-column align-items-center"
        onFinish={handleSubmit(submitLogin)}
      >
        <h3 className="m-b-38">Deep Sniff System</h3>
        <Form.Item className="width-70-per">
          <Select
            className={`${selectedMachineError ? 'error-select' : ''}`}
            placeholder="Select a machine"
            onChange={(data) => {
              setMachine(data);
            }}
            allowClear
            loading={loadingMachineList}
          >
            {listMachine?.map((machineItem, index) => (
              <Option key={index} value={machineItem.id}>
                {machineItem.name}
              </Option>
            ))}
          </Select>
          <FieldError
            message={selectedMachineError && 'Please selecte machine'}
          />
        </Form.Item>

        <Form.Item className="width-70-per" label="Password">
          <Input
            className={`${errors?.password?.message || wrongPassword ? 'error-field' : ''}`}
            onKeyDown={() => {
              setWrongPassword('');
            }}
            type="password"
            {...register('password')}
          />
          <FieldError message={errors?.password?.message || wrongPassword} />
        </Form.Item>
        <Form.Item className="width-70-per">
          <Checkbox defaultChecked onChange={onCheck}>
            Login as supervisor
          </Checkbox>
        </Form.Item>
        <Form.Item className="justify-content-center">
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (params, callback) => dispatch(login(params, callback)),
  handleGetListMachine: () => dispatch(getMachineId()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
