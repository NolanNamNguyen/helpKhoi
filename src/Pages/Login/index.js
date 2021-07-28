import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Input, Button, Select, Checkbox } from 'antd';

import FieldError from '../../components/FieldError';
import { login, getMachineId } from '../../redux/actions/homeAction';
import { APP_ROLE } from '../../constants/common';

const Login = ({ handleLogin, handleGetListMachine, homeReducer }) => {
  const { listMachine, loadingMachineList } = homeReducer;
  const [machine, setMachine] = useState('');
  const [selectedMachineError, setSelectedMachineError] = useState(false);
  const [roleCheck, setRoleCheck] = useState(true);

  useEffect(() => {
    handleGetListMachine();
  }, []);

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
    handleLogin({
      mid: machine,
      pswd: data.password,
      role: roleCheck ? APP_ROLE.SUPERVISOR : APP_ROLE.MANAGER,
    });
  };

  return (
    <div className="d-flex flex-column width-100-per align-items-center justify-content-center height-100-per login-form-container">
      <Form className="login-form p-a-20 d-flex flex-column align-items-center" onFinish={handleSubmit(submitLogin)}>
        <h3 className="m-b-38">High quality chick trader community</h3>
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
              <Option key={index} value={machineItem.id}>{machineItem.name}</Option>
            ))}
          </Select>
          <FieldError
            message={selectedMachineError && 'Please selecte machine'}
          />
        </Form.Item>

        <Form.Item className="width-70-per" label="Password">
          <Input
            className={`${errors?.password?.message ? 'error-field' : ''}`}
            type="password"
            {...register('password')}
          />
          <FieldError message={errors?.password?.message} />
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
  handleLogin: (params) => dispatch(login(params)),
  handleGetListMachine: () => dispatch(getMachineId()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
