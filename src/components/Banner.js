import React from 'react'

const Banner = ({isTourOpen, setIsTourOpen}) => {
  return (
    <div className="bg-gradient-to-r from-slate-300 to-slate-900 text-white p-4 rounded-lg shadow-lg mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex flex-col md:flex-row items-start lg:items-center">Good Morning,&nbsp;<span className="bg-gradient-to-r from-slate-900  to-purple-900  bg-no-repeat bg-bottom p-1 text-white rounded-md"> Dev Dynamics </span> &nbsp; &#128075;</h1>
        <h3 className="text-sm font-lighter text-slate-700">Spotlight on Team Successes</h3>
      </div>
      <div className='flex items-center flex-col lg:flex-row'>
        <button className='bg-slate-900 text-slate-200 px-4 py-2 rounded-lg mr-3 mb-4 lg:mb-0  hover:bg-white hover:text-slate-900 font-semibold' onClick={()=>setIsTourOpen(!isTourOpen)}>
          Site Guide
        </button>
        <a style={{'--clr': '#ffffff'}} class="button" href="https://calendly.com/kunalmewara01/30min" target="_blank" rel="noopener noreferrer">
          <span class="button__icon-wrapper">
              <svg width="10" class="button__icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 15">
                  <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
              </svg>
              
              <svg class="button__icon-svg  button__icon-svg--copy" xmlns="http://www.w3.org/2000/svg" width="10" fill="none" viewBox="0 0 14 15">
                  <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
              </svg>
          </span>
          Schedule Meeting
        </a>
      </div>
    </div>
  )
}

export default Banner