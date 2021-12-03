import React from "react";
import "./styles.css";

const App = () => {
<<<<<<< HEAD
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  const count = useSelector((state) => state.counter.count);
  const voters = ["Anthony Sistilli", "Bob Smith", "Stephanie Foo", "Kevin Ma"];
=======
>>>>>>> 621668b (Clean Repository)
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
};

export default App;
