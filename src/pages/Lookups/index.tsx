import React from "react";
import { act } from "react-dom/test-utils";

import AuthLayout from "src/layout/AuthLayout";
import instance from "src/utils/axios";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import LookupForm from "./components/LookupForm";

const initialState = {
  labels: [],
};

const Lookups = () => {
  const [data, setData] = React.useState<any>(initialState);
  const [activeId, setActiveId] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (
      history.location.pathname === "/look-ups" &&
      !activeId &&
      data.labels.length
    ) {
      history.push(`/look-ups/${data.labels[0].id}`);
    }
  }, [activeId, data, history]);

  const getData = () => {
    instance
      .get("/lookups")
      .then((labels) => {
        setData((prev) => ({ ...prev, labels }));
      })
      .catch(() => {});
  };
  return (
    <AuthLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <aside className="bg-gray-100 p-4 capitalize grid">
            {data.labels.map(({ name, id }) => (
              <Link key={id} to={`/look-ups/${id}`}>
                <div
                  className={`p-2 ${
                    activeId == id ? "bg-pink-700 text-white" : null
                  }`}
                >
                  {name}
                </div>
              </Link>
            ))}
          </aside>
        </div>
        <section className="col-span-9">
          <Switch>
            <Route path="/look-ups/:id">
              <LookupForm setActiveId={setActiveId} />
            </Route>
          </Switch>
        </section>
      </div>
    </AuthLayout>
  );
};

export default Lookups;
