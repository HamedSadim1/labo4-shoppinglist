import React from 'react';
import { useList } from '../hooks/useList';
import Button from './ui/Button';
import Card from './ui/Card';
import PageContainer from './ui/PageContainer';
import TextInput from './ui/TextInput';

interface ListItem {
  firstName: string;
  email: string;
}

const List = () => {
  const { items: list, add, update } = useList<ListItem>([{ firstName: '', email: '' }]);

  const addListItem: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const email = formData.get('email') as string;
    if (firstName || email) {
      add({ firstName, email });
    }
  };

  return (
    <PageContainer>
      <h2 className="text-2xl font-bold text-white">List Manager</h2>
      {list.map((item, index) => (
        <Card
          key={index}
          padding="p-4"
          rounding="rounded-xl"
          shadow={false}
          animation={false}
          className="space-y-3"
        >
          <form onSubmit={addListItem} className="space-y-2">
            <div>
              <label htmlFor={`firstName-${index}`} className="block text-sm text-white/60 mb-1">
                First Name
              </label>{' '}
              <TextInput
                type="text"
                id={`firstName-${index}`}
                name="firstName"
                value={item.firstName}
                onChange={(e) => {
                  update(index, { firstName: e.target.value });
                }}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor={`email-${index}`} className="block text-sm text-white/60 mb-1">
                Email
              </label>{' '}
              <TextInput
                type="email"
                id={`email-${index}`}
                name="email"
                value={item.email}
                onChange={(e) => {
                  update(index, { email: e.target.value });
                }}
                className="w-full"
              />
            </div>
            <Button type="submit" variant="ghost" size="md">
              Add product
            </Button>
          </form>
        </Card>
      ))}
      {list.length > 0 && (
        <Card padding="p-4" rounding="rounded-xl" shadow={false} animation={false}>
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
        </Card>
      )}
    </PageContainer>
  );
};

export default List;
