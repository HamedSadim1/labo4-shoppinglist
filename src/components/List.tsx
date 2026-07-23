import { produce } from 'immer';
import React, { useState } from 'react';

interface ListItem {
  firstName: string;
  email: string;
}

const List = () => {
  const [list, setList] = useState<ListItem[]>([{ firstName: '', email: '' }]);

  const addListItem: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const email = formData.get('email') as string;
    if (firstName || email) {
      setList([...list, { firstName, email }]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-white">List Manager</h2>
      {list.map((item, index) => (
        <div key={index} className="glass rounded-xl p-4 space-y-3">
          <form onSubmit={addListItem} className="space-y-2">
            <div>
              <label htmlFor={`firstName-${index}`} className="block text-sm text-white/60 mb-1">
                First Name
              </label>
              <input
                type="text"
                id={`firstName-${index}`}
                name="firstName"
                value={item.firstName}
                onChange={(e) => {
                  const val = e.target.value;
                  setList((currentPeople) =>
                    produce(currentPeople, (v) => {
                      v[index].firstName = val;
                    }),
                  );
                }}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
              />
            </div>
            <div>
              <label htmlFor={`email-${index}`} className="block text-sm text-white/60 mb-1">
                Email
              </label>
              <input
                type="email"
                id={`email-${index}`}
                name="email"
                value={item.email}
                onChange={(e) => {
                  const val = e.target.value;
                  setList((currentPeople) =>
                    produce(currentPeople, (v) => {
                      v[index].email = val;
                    }),
                  );
                }}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
              />
            </div>
            <button
              type="submit"
              className="bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
            >
              Add product
            </button>
          </form>
        </div>
      ))}
      {list.length > 0 && (
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm font-medium text-white/50 mb-2">Items:</h3>
          <ul className="space-y-1">
            {list.map((item, index) => (
              <li key={index} className="text-white/70 text-sm">
                {item.firstName}
                {item.firstName && item.email ? ' — ' : ''}
                {item.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default List;
