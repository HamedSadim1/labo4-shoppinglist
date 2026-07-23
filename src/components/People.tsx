import { useState } from 'react';
import { produce } from 'immer';
import { generate } from 'shortid';

interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

const People = () => {
  const [people, setPeople] = useState<Person[]>([{ id: generate(), firstName: '', lastName: '' }]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    if (firstName && lastName) {
      setPeople([...people, { id: generate(), firstName, lastName }]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">People</h2>
        <button
          onClick={() => {
            setPeople((currentPeople) => [
              ...currentPeople,
              { id: generate(), firstName: '', lastName: '' },
            ]);
          }}
          className="bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
        >
          Add Person
        </button>
      </div>

      <div className="space-y-3">
        {people.map((p, index) => (
          <div key={p.id} className="glass rounded-xl p-4 space-y-3">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  value={p.firstName}
                  onChange={(e) => {
                    const firstName = e.target.value;
                    setPeople((currentPeople) =>
                      produce(currentPeople, (v) => {
                        v[index].firstName = firstName;
                      }),
                    );
                  }}
                  placeholder="First name"
                  name="firstName"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
                <input
                  value={p.lastName}
                  placeholder="Last name"
                  name="lastName"
                  onChange={(e) => {
                    const lastName = e.target.value;
                    setPeople((currentPeople) =>
                      produce(currentPeople, (v) => {
                        v[index].lastName = lastName;
                      }),
                    );
                  }}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Add to Array
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPeople((currentPeople) => currentPeople.filter((x) => x.id !== p.id));
                  }}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-200 font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>

      {people.length > 0 && (
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm font-medium text-white/50 mb-2">All People:</h3>
          <div className="space-y-1">
            {people.map((p, index) => (
              <div key={p.id + index} className="text-white/70 text-sm">
                {p.firstName} {p.lastName}
              </div>
            ))}
          </div>
        </div>
      )}

      <details className="glass rounded-xl p-4">
        <summary className="text-white/50 text-sm cursor-pointer hover:text-white/70 transition-colors">
          Raw data (JSON)
        </summary>
        <pre className="mt-2 text-white/40 text-xs overflow-auto">
          {JSON.stringify(people, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default People;
