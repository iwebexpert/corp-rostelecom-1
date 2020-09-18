import React, {Component} from 'react';

export default props => (
    <div>
      <p><strong>Сообщение {props.num}: </strong>{props.message} <strong>Автор:</strong> {props.author} </p>
    </div>
  )


