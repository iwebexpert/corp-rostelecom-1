import React from "react"

import "./Profile.css"

export default function Profile({ user }) {
  return (
    <div className="container">
      {{ user } ? (
        <div>
          <h3>Profile page:</h3>
          <p>
            <strong>Имя:</strong>
            &nbsp;{user.name}
          </p>
          <p>
            <strong>Возраст:</strong>
            &nbsp;{user.age}
          </p>
          <p>
            <strong>Город:</strong>
            &nbsp;{user.town}
          </p>
          <p>
            <strong>Почта:</strong>
            &nbsp;{user.email}
          </p>
        </div>
      ) : (
        <p>Нет пользователя</p>
      )}
    </div>
  )
}
