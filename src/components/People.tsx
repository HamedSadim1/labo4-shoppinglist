import { generate } from 'shortid';
import { useList } from '../hooks/useList';
import Button from './ui/Button';
import Card from './ui/Card';
import PageContainer from './ui/PageContainer';
import TextInput from './ui/TextInput';

interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

const People = () => {
  const {
    items: people,
    add,
    remove,
    update,
  } = useList<Person>([{ id: generate(), firstName: '', lastName: '' }]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    if (firstName && lastName) {
      add({ id: generate(), firstName, lastName });
    }
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">People</h2>
        <Button
          onClick={() => {
            add({ id: generate(), firstName: '', lastName: '' });
          }}
          variant="ghost"
          size="md"
        >
          Add Person
        </Button>
      </div>

      <div className="space-y-3">
        {people.map((p, index) => (
          <Card
            key={p.id}
            padding="p-4"
            rounding="rounded-xl"
            shadow={false}
            animation={false}
            className="space-y-3"
          >
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2">
                <TextInput
                  value={p.firstName}
                  onChange={(e) => {
                    update(index, { firstName: e.target.value });
                  }}
                  placeholder="First name"
                  name="firstName"
                  className="flex-1"
                />
                <TextInput
                  value={p.lastName}
                  placeholder="Last name"
                  name="lastName"
                  onChange={(e) => {
                    update(index, { lastName: e.target.value });
                  }}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant="ghost" size="md">
                  Add to Array
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                  variant="ghost-danger"
                  size="md"
                >
                  Remove
                </Button>
              </div>
            </form>
          </Card>
        ))}
      </div>

      {people.length > 0 && (
        <Card padding="p-4" rounding="rounded-xl" shadow={false} animation={false}>
          <h3 className="text-sm font-medium text-white/50 mb-2">All People:</h3>
          <div className="space-y-1">
            {people.map((p, index) => (
              <div key={p.id + index} className="text-white/70 text-sm">
                {p.firstName} {p.lastName}
              </div>
            ))}
          </div>
        </Card>
      )}

      <details className="glass rounded-xl p-4">
        <summary className="text-white/50 text-sm cursor-pointer hover:text-white/70 transition-colors">
          Raw data (JSON)
        </summary>
        <pre className="mt-2 text-white/40 text-xs overflow-auto">
          {JSON.stringify(people, null, 2)}
        </pre>
      </details>
    </PageContainer>
  );
};

export default People;
