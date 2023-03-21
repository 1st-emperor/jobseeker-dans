import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from "axios"

import {BiTimeFive} from 'react-icons/bi'
import {BiArrowBack} from 'react-icons/bi'
import {AiOutlineSearch} from 'react-icons/ai'
import {CiLocationOn} from 'react-icons/ci'

import logo1 from '../../assets/logo(1).png'
import logo2 from '../../assets/logo(2).png'
import logo3 from '../../assets/logo(3).png'
import logo4 from '../../assets/logo(4).png'
import logo5 from '../../assets/logo(5).png'
import logo6 from '../../assets/logo(6).png'
import logo7 from '../../assets/logo(7).png'
import logo8 from '../../assets/logo(8).png'

const Data = [
  {
    id: 1,
    image: logo1,
    title: 'Software Eng',
    time: 'Now',
    location: 'Canada',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere laborum repellat itaque maiores veritatis optio?',
    company: 'Novac Linus Co.'
  },
  {
    id: 2,
    image: logo2,
    title: 'UI Designer',
    time: '14Hrs',
    location: 'Manchester',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere laborum repellat itaque maiores veritatis optio?',
    company: 'Liquid Accessments'
  },
  {
    id: 3,
    image: logo3,
    title: 'Software Eng',
    time: '10Hrs',
    location: 'Austria',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere laborum repellat itaque maiores veritatis optio?',
    company: 'Web Tech Agency'
  },
  {
    id: 4,
    image: logo4,
    title: 'UI/UX Designer',
    time: '10Hrs',
    location: 'Germany',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere laborum repellat itaque maiores veritatis optio?',
    company: 'Government'
  },
  {
    id: 5,
    image: logo5,
    title: 'Product Owner',
    time: 'Now',
    location: 'Manchester',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere laborum repellat itaque maiores veritatis optio?',
    company: 'New Castle'
  },
  {
    id: 6,
    image: logo6,
    title: 'Researcher',
    time: '5Hrs',
    location: 'Norway',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere laborum repellat itaque maiores veritatis optio?',
    company: 'Nin Co.'
  },
  {
    id: 7,
    image: logo7,
    title: 'Lead Developer',
    time: '14Hrs',
    location: 'Leeds',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere laborum repellat itaque maiores veritatis optio?',
    company: 'Nimelai - UK'
  },
  {
    id: 8,
    image: logo8,
    title: 'Data Scientist',
    time: '2 Days',
    location: 'Turkey',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere laborum repellat itaque maiores veritatis optio?',
    company: 'Name And Sons'
  },
]

const Jobs = () => {
  const [detail, setDetail] = useState({});
  const [tweak, setTweak] = useState(false);
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState({
    description: "",
    location: "",
    type: false
  });

  const observer = useRef();
  const lastUserElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPages(prevPages => prevPages + 1)
      }
    });
    if (node) observer.current.observe(node)
  }, [loading, hasMore]);

  useEffect(() => {
    setUsers([]);
  }, [query])

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
      params: { description: query.description, location: query.location, type: query.type },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setUsers(prevUsers => {
        return [...prevUsers, ...res.data];
      })
      setHasMore(res.data.length > 0);
      setLoading(false);
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true);
    })
    return () => cancel()
  }, [query, pages])

  const handleSearch = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setQuery({
      ...query,
      [event.target.name]: value
    })
    setPages(1)
  }

  const getDetail = (user) => {
    console.log("dapet", user);
    setDetail(user);
    setTweak(true);
  }

  return (
    <div>

      <div className='searchDiv grid gap-10 bg-greyIsh rounded-[10px] p-[3rem]'>
        <form >
          <div className='firstDiv flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg shadow-greyIsh-700'>
            <div className='flex gap-2 items-center'>
              <AiOutlineSearch className='text-[25px] icon' />
              <input type='text' name='description' value={query.description} onChange={handleSearch} className='bg-transparent text-blue-500 focus:outline-none w-[100%]' placeholder='Search Job Here....' />
              {/* <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon' /> */}
            </div>

            <div className='flex gap-2 items-center'>
              <CiLocationOn className='text-[25px] icon' />
              <input type='text' name='location' value={query.location} onChange={handleSearch} className='bg-transparent text-blue-500 focus:outline-none w-[100%]' placeholder='Search by location....' />
              {/* <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon' /> */}
            </div>

            <div className='flex gap-2 items-center'>
              <input id='type' type="checkbox" name='type' checked={query.type} onChange={handleSearch} />
              <label htmlFor="type" className='bg-transparent text-textColor text-[13px] font-semibold focus:outline-none w-[100%]'>Full Time Only</label>
            </div>
          </div>
        </form>
      </div>

      {
        users.length > 0 && !tweak ? <h1 className='flex justify-start text-[25px] ml-2 py-5 font-bold'>Job List</h1> : <h1 className='flex justify-start text-[25px] ml-2 py-5 font-bold'>Detail</h1>
      }

      { users.length == 0 && <h1 className='flex justify-center text-[25px] ml-2 py-5 font-bold'>Data Not Found.</h1> }

      { 
        tweak && 
        <span onClick={() => setTweak(false)} className='icon flex items-center ml-3 font-bold gap-2 hover:text-blueColor'>
          <BiArrowBack /> Back
        </span> 
      }

      <div className='jobContainer flex gap-10 justify-center flex-wrap items-center py-5'>
        
        {
          tweak &&
          <div className='group group/item singleJob p-[20px] bg-white rounded-[10px] shadow-lg shadow-greyIsh-400-700 hover:shadow-lg'>

            <h6 className='text-[#ccc]'>{ detail.type } / { detail.location }</h6>
            <span className='flex justify-between items-center gap-4'>
              <h1 className='text-[16px] font-semibold text-textColor'>
                {detail.title}
              </h1>
            </span>
    
            <p dangerouslySetInnerHTML={{__html: detail.description}} className='text-[13px]   pt-[20px]  mt-[2-px]'>
            </p>
          </div>
        }

        {
          !tweak && users.map((user, index) => {
            return (
              <div key={user.id} className='group group/item singleJob p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greyIsh-400-700 hover:shadow-lg'>

                <span className='flex justify-between items-center gap-4'>
                  <h1 className='text-[16px] font-semibold text-textColor group-hover:text-white'>
                    {user.title}
                  </h1>
                  <span className='flex items-center text-[#ccc] gap-1'>
                    <BiTimeFive />{user.type}
                  </span>
                </span>
                <h6 className='text-[#ccc]'>{user.location}</h6>

                <p className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[2-px] group-hover:text-white'>
                  <a href="">
                    https://bewerbungsportal.devk.de/jobs/15252-cloud-platform-engineer-d-m-w/job_application/new?cid=662c9407-f8cb-4024-a169-90c1c45dcfb4&jid=7d3c50b7-4033-4607-a7e6-5a66a29062c0&pid=3c460e75-1500-4628-862b-d5e5a9a02334&it=4oCg1W3_iapbwK0VP9K01w
                  </a>
                </p>

                <div className='company flex items-center gap-2'>
                  <span className='text-[14px] py-[1rem] black group-hover:text-white'>{user.company}</span>
                </div>

                <button onClick={() => getDetail(user)} className='border-[2px] rounded-[10px] black p-[10px] w-full text-[14px] font-semibold text-textColor hover:bg-white group-hover/item:text-textColor'>
                  Apply Now
                </button>
              </div>
            )
            // if (users.length === index + 1) {
            //   return (
            //     <div key={user.id} ref={lastUserElementRef} className='group group/item singleJob p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greyIsh-400-700 hover:shadow-lg'>
  
            //       <span className='flex justify-between items-center gap-4'>
            //         <h1 className='text-[16px] font-semibold text-textColor group-hover:text-white'>
            //           {user.title}
            //         </h1>
            //         <span className='flex items-center text-[#ccc] gap-1'>
            //           <BiTimeFive />{user.type}
            //         </span>
            //       </span>
            //       <h6 className='text-[#ccc]'>{user.location}</h6>
  
            //       {/* <p dangerouslySetInnerHTML={{__html: user.how_to_apply}} className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[2-px] group-hover:text-white'>
            //       </p> */}
  
            //       <p className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[2-px] group-hover:text-white'>
            //         <a href="">
            //           https://bewerbungsportal.devk.de/jobs/15252-cloud-platform-engineer-d-m-w/job_application/new?cid=662c9407-f8cb-4024-a169-90c1c45dcfb4&jid=7d3c50b7-4033-4607-a7e6-5a66a29062c0&pid=3c460e75-1500-4628-862b-d5e5a9a02334&it=4oCg1W3_iapbwK0VP9K01w
            //         </a>
            //       </p>
  
            //       <div className='company flex items-center gap-2'>
            //         <span className='text-[14px] py-[1rem] black group-hover:text-white'>{user.company}</span>
            //       </div>
  
            //       <button className='border-[2px] rounded-[10px] black p-[10px] w-full text-[14px] font-semibold text-textColor hover:bg-white group-hover/item:text-textColor'>
            //         Apply Now
            //       </button>
            //     </div>
            //   )
            // } else {
            //   return (
            //     <div key={user.id} className='group group/item singleJob p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greyIsh-400-700 hover:shadow-lg'>
  
            //       <span className='flex justify-between items-center gap-4'>
            //         <h1 className='text-[16px] font-semibold text-textColor group-hover:text-white'>
            //           {user.title}
            //         </h1>
            //         <span className='flex items-center text-[#ccc] gap-1'>
            //           <BiTimeFive />{user.type}
            //         </span>
            //       </span>
            //       <h6 className='text-[#ccc]'>{user.location}</h6>
  
            //       {/* <p dangerouslySetInnerHTML={{__html: user.how_to_apply}} className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[2-px] group-hover:text-white'>
            //       </p> */}
  
            //       <p className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[2-px] group-hover:text-white'>
            //         <a href="">
            //           https://bewerbungsportal.devk.de/jobs/15252-cloud-platform-engineer-d-m-w/job_application/new?cid=662c9407-f8cb-4024-a169-90c1c45dcfb4&jid=7d3c50b7-4033-4607-a7e6-5a66a29062c0&pid=3c460e75-1500-4628-862b-d5e5a9a02334&it=4oCg1W3_iapbwK0VP9K01w
            //         </a>
            //       </p>
  
            //       <div className='company flex items-center gap-2'>
            //         <span className='text-[14px] py-[1rem] black group-hover:text-white'>{user.company}</span>
            //       </div>
  
            //       <button className='border-[2px] rounded-[10px] black p-[10px] w-full text-[14px] font-semibold text-textColor hover:bg-white group-hover/item:text-textColor'>
            //         Apply Now
            //       </button>
            //     </div>
            //   )
            // }
          })
        }

      </div>

      <div className='flex justify-center gap-12'>{loading && 'Loading...'}</div>
      <div className='flex justify-center gap-12'>{error && 'Error'}</div>

    </div>
  )
}

export default Jobs