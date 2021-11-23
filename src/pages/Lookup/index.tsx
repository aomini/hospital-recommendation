import React from "react";
import AuthLayout from "src/layout/AuthLayout";
import instance from "src/utils/axios";
import { Link, Switch, Route } from "react-router-dom";
import LookupForm from "./components/LookupForm";

const initialState = {
  labels: [],
};

const Lookup = () => {
  const [data, setData] = React.useState<any>(initialState);
  const [activeId, setActiveId] = React.useState(null);

  React.useEffect(() => {
    getData();
  }, []);

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
              <Link key={id} to={`/look-up/${id}`}>
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
            <Route path="/look-up/:id">
              <LookupForm setActiveId={setActiveId} />
            </Route>
          </Switch>
        </section>
      </div>
    </AuthLayout>
  );
};

export default Lookup;
