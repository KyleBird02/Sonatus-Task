import React from 'react';

function UserItem({ user, onSelect }) {
  return (
    <li className="user-item" onClick={() => onSelect(user)}>
      <div className="user-name">{user.name}</div>
      <div className="user-email">{user.email}</div>
    </li>
  );
}

export default UserItem;