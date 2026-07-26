import { useState } from 'react';
import { generate } from 'shortid';
import { FRIEND_LIST } from '../config';
import Button from './ui/Button';
import Card from './ui/Card';
import PageContainer from './ui/PageContainer';
import TextInput from './ui/TextInput';

export default function FriendList() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([
    { id: '1', name: 'Marta Colvin Andrade' },
    { id: '2', name: 'Lamidi Olonade Fakeye' },
    { id: '3', name: 'Louise Nevelson' },
  ]);

  function addFriend() {
    if (!name.trim()) return;
    const nextFriends = [
      ...friends.slice(0, FRIEND_LIST.INSERT_AT),
      { id: generate(), name: name.trim() },
      ...friends.slice(FRIEND_LIST.INSERT_AT),
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
    <PageContainer>
      <h2 className="text-2xl font-bold text-white">Friend List</h2>
      <Card
        padding="p-4"
        rounding="rounded-xl"
        shadow={false}
        animation={false}
        className="space-y-3"
      >
        <p className="text-sm text-white/50">Inspiring sculptors:</p>
        <div className="flex gap-2">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a friend..."
            className="flex-1"
          />
          <Button onClick={addFriend} disabled={!name.trim()} variant="ghost" size="md">
            Insert
          </Button>
        </div>
      </Card>
      <ul className="space-y-2">
        {friends.map((friend) => (
          <Card
            key={friend.id}
            as="li"
            padding="px-4 py-3"
            rounding="rounded-xl"
            shadow={false}
            animation={false}
            className="text-white/80 hover:bg-white/10 transition-colors"
          >
            {friend.name}
          </Card>
        ))}
      </ul>
    </PageContainer>
  );
}
