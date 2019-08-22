import React, { Component } from 'react'
import {list,DeleteUser} from "../Api/Http"
import {isAuthenticated} from "../Api/Auth"
import Button from '@atlaskit/button';

import Form, { Field, CheckboxField } from '@atlaskit/form';
import { Checkbox } from '@atlaskit/checkbox';
import Textfield from '@atlaskit/textfield';
import RadioGroup, { AkRadio } from '@atlaskit/field-radio-group';
import { Label } from '@atlaskit/field-base';
import { DatePicker } from '@atlaskit/datetime-picker';
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog';



export default class Company extends Component {
    constructor(){
        super()
        this.state={
            isOpen: false,
            worker: []
        }
    }
    open = () => this.setState({ isOpen: true });

    close = () => this.setState({ isOpen: false });

    onFormSubmit = (data) => console.log(JSON.stringify(data));
    handleClick(userId) {
        const token = isAuthenticated().token  
        DeleteUser(userId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                console.log("200 ok")
            }
        })
    }
    componentDidMount() {
        list().then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({worker:data})
            }
        })
    }
    
    render() {
        const { isOpen } = this.state
        const radioItems = [
            { name: 'color', value: 'Директор', label: 'Директор' },
            { name: 'color', value: 'Менеджер', label: 'Менеджер' },
            { name: 'color', value: 'Бухгалтер', label: 'Бухгалтер' },
            { name: 'color', value: 'Склад', label: 'Склад' }
          ];
      
        const {worker} = this.state
        return (
            <>
            <Button onClick={this.open}>Новый сотрудник</Button>

<ModalTransition>
  {isOpen && (
    <ModalDialog
      heading="Новый сотрудник"
      onClose={this.close}
      components={{
        Container: ({ children, className }) => (
          <Form onSubmit={this.onFormSubmit}>
            {({ }) => (
              <form  className={className}>
                {children}
              </form>
            )}
          </Form>
        )
      }}
    >
      <Field label="Имя" name="my-name" defaultValue="">
        {() => (
          <Textfield  />
        )}
      </Field>
      <Field label="Фамилия" name="my-name" defaultValue="">
        {() => (
          <Textfield  />
        )}
      </Field>
      <Field label="Отчество" name="my-name" defaultValue="">
        {() => (
          <Textfield  />
        )}
      </Field>
      <Field label="Почта" name="my-email" defaultValue="">
        {() => (
          <Textfield
            autoComplete="off"
            placeholder="gbelson@hooli.com"
            
          />
        )}
      </Field>
      <Field label="Password" name="password" defaultValue="">
        {() => (
          <Textfield
          type="password" 
            
          />
        )}
      </Field>
      <Label htmlFor="react-select-datepicker-1--input" label="День рожденье" />
      <DatePicker id="datepicker-1"/>    
      <Field name="radiogroup" defaultValue="">
        {() => (
          <RadioGroup
            items={radioItems}
            label="Роль"
          >
            <AkRadio name="standalone" value="singleButton">
              
            </AkRadio>
          </RadioGroup>
        )}
      </Field>
    </ModalDialog>
  )}
</ModalTransition>
            {worker.map((user, i) => (
            <>
            <div>
            <div>Имя: <strong>{user.name}</strong>  Email: <strong>{user.email}</strong> Последний заказ:<strong>{user.updated}</strong>Номер телефона:<strong>{user.phone}</strong></div>
            <div></div>
            <button waves="light" style={{marginRight: '5px', backgroundColor: '#DC143C'}}  onClick={(userId) => this.handleClick(user._id, userId)}>Удалить Пользователя</button>    
            </div>
            </>
            ))}
            </>
        )
    }
}
