import React from 'react';
import { Button, TextField } from '@material-ui/core';

export function ProfilePage() {
  return (
    <div>
      <img height="200" src="https://as2.ftcdn.net/jpg/03/39/34/25/500_F_339342532_DlJoFEDUDcOZN3V2z6l9yauLEcvnCfVF.jpg" alt="Фото" />
      <div>Данные профиля</div>
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