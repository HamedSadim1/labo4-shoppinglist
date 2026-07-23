import { useState } from 'react';
import { generate } from 'shortid';

export default function FriendList() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([
    { id: '1', name: 'Marta Colvin Andrade' },
    { id: '2', name: 'Lamidi Olonade Fakeye' },
    { id: '3', name: 'Louise Nevelson' },
  ]);

  function addFriend() {
    if (!name.trim()) return;
    const insertAt = 1;
    const nextFriends = [
      ...friends.slice(0, insertAt),
      { id: generate(), name: name.trim() },
      ...friends.slice(insertAt),
    ];
    setFriends(nextFriends);
    setName('');
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addFriend();
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-white">Friend List</h2>
      <div className="glass rounded-xl p-4 space-y-3">
        <p className="text-sm text-white/50">Inspiring sculptors:</p>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a friend..."
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
          />
          <button
            onClick={addFriend}
            disabled={!name.trim()}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
          >
            Insert
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {friends.map((friend) => (
          <li
            key={friend.id}
            className="glass rounded-xl px-4 py-3 text-white/80 hover:bg-white/10 transition-colors"
          >
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
