import React, { useState } from "react";
import { produce } from "immer";
import { generate } from "shortid";

interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

const People = () => {
  const [people, setPeople] = useState<Person[]>([
    { id: "", firstName: "", lastName: "" },
  ]);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const firstName = e.currentTarget.value;
    const lastName = e.currentTarget.value;
    if (firstName && lastName) {
      setPeople([...people, { id: generate(), firstName, lastName }]);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={() => {
          setPeople((currentPeople) => [
            ...currentPeople,
            {
              id: generate(),
              firstName: "",
              lastName: "",
            },
          ]);
        }}
      >
        Add new Person
      </button>
      {people.map((p, index) => {
        return (
          <div key={p.id}>
            <form onSubmit={handleSubmit}>
              <input
                value={p.firstName}
                onChange={(e) => {
                  const firstName = e.target.value;
                  setPeople((currentPeople) =>
                    produce(currentPeople, (v) => {
                      v[index].firstName = firstName;
                    })
                  );
                }}
                placeholder="first name"
              />

              <input
                value={p.lastName}
                placeholder="last name"
                onChange={(e) => {
                  const lastName = e.target.value;
                  setPeople((currentPeople) =>
                    produce(currentPeople, (v) => {
                      v[index].lastName = lastName;
                    })
                  );
                }}
              />
              <button
                onClick={() => {
                  setPeople((currentPeople) =>
                    currentPeople.filter((x) => x.id !== p.id)
                  );
                }}
              >
                Remove
              </button>
              <button>Add to Array</button>
            </form>
          </div>
        );
      })}
      <pre>{JSON.stringify(people, null, 2)}</pre>

      <h1>met add</h1>
      {people.map((p, index) => {
        return (
          <div key={p.id}>
            {p.firstName} {p.lastName}
          </div>
        );
      })}
    </div>
  );
};
export default People;
