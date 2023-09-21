import React, { Fragment, useState } from "react";
import { produce } from "immer";

interface ListItem {
  firstName: string;
  email: string;
}

const List = () => {
  const [list, setList] = useState<ListItem[]>([{ firstName: "", email: "" }]);

  const addListItem: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const firstName = e.currentTarget.value;
    const email = e.currentTarget.value;
    setList([...list, { firstName: firstName, email: email }]);
    console.log(firstName, email);
  };

  return (
    <>
      <div>
        {list.map((item, index) => (
          <div key={index}>
            <form onSubmit={addListItem}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={item.firstName}
                onChange={(e) => {
                  const lastName = e.target.value;
                  setList((currentPeople) =>
                    produce(currentPeople, (v) => {
                      v[index].firstName = lastName;
                    })
                  );
                }}
              />
              <br />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={item.email}
                onChange={(e) => {
                  const email = e.target.value;
                  setList((currentPeople) =>
                    produce(currentPeople, (v) => {
                      v[index].email = email;
                    })
                  );
                }}
              />
              <br />
              <input type="submit" value="Add product" />
            </form>
          </div>
        ))}
      </div>
      {list.map((item, index) => (
        <ul key={index}>
          {item.firstName}
          {item.email}
        </ul>
      ))}
    </>
  );
};

export default List;
