import React from "react"

import "./Profile.css"

export default function Profile({ profile }) {
  return (
    <div className="container">
      {{ profile } ? (
        <div>
          <h3>Profile page:</h3>
          <p>
            <strong>Имя:</strong>
            &nbsp;{profile.name}
          </p>
          <p>
            <strong>Возраст:</strong>
            &nbsp;{profile.age}
          </p>
          <p>
            <strong>Город:</strong>
            &nbsp;{profile.town}
          </p>
          <p>
            <strong>Почта:</strong>
            &nbsp;{profile.email}
          </p>
        </div>
      ) : (
        <p>Нет пользователя</p>
      )}
    </div>
  )
}
