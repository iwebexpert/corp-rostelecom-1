import React from 'react';
import { Button, TextField } from '@material-ui/core';

export function ProfilePage() {



  return (
    <div>
      <div>Данные профиля</div>
      <div>email: ivan@mail.ru</div>
      <div>name: Иван Иванов</div>
      <div>
        <TextField
          label="Введите ФИО"
          name="author"
          variant="outlined"
          style={{ margin: 10 }} />
        <TextField
          label="Введите Возраст"
          name="text"
          multiline
          autoFocus
          variant="outlined"
          style={{ margin: 10 }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 10, marginTop: 18 }}
        >
          Сохранить
      </Button>
      </div>


    </div>
  );
}