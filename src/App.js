import React, { useEffect, useState } from "react";
import { apiUrl, filterData } from "./data";
import Navbar from "./component/Navbar";
import Filter from "./component/Filter";
import Cards from "./component/Cards"
import { toast } from "react-toastify";
// import { useEffect } from "react";
import Spinner from "./component/Spinner"

const App = () => {
  const [courses, setCourses] = useState(null);

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title)
  // useEffect(()=>{
  async function fetchData() {
    setLoading(true);
    try {
      let res = await fetch(apiUrl);
      let output = await res.json();
      //save data into a variable
      // console.log(data.data);
      setCourses(output.data);
    }
    catch (error) {
      toast.error("something went wrong")
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div><Navbar /></div>
      <div className="bg-bgDark2">
        <div><Filter filterData={filterData} category={category} setCategory={setCategory} /></div>

        <div className="w-11/12 max-w[1200px] mx-auto flex flex-wrap justify-center item-center min-h-[50vh]">

          {
            loading ? (<Spinner />) : (<Cards courses={courses} category={category} />)
          }

        </div>

      </div>


    </div>
  );
};

export default App;
