import FormRow  from './FormRow';
import { useSelector, useDispatch } from 'react-redux';
import FormRowSelect from './FormRowSelect';
import Wrapper from '../assets/wrapper/searchContainer';
import { clearFilter, handleChange } from '../features/allJobs/allJobsSlice';
// import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';
// import { useState, useMemo } from 'react';

const SearchContainer=()=>{
    const {isLoading, search, searchStatus, searchType, sort, sortOptions} = useSelector((store)=>store.allJobs);

    const {statusOptions} = useSelector((store)=>store.job)
    const dispatch = useDispatch();

    const handleSearch=(e)=>{
        if(isLoading) return;
        dispatch(handleChange({name:e.target.name, value:e.target.value}))
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(clearFilter())
    }
    return(
       <Wrapper>
       <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>
            <FormRow type="text" labelText="Search" name="search" value={search} handleChange = {handleSearch}/>
            <FormRowSelect labelText="Status" name="searchStatus" value={searchStatus} handleChange={handleSearch} list={['all',...statusOptions]}/>
            <FormRowSelect labelText="Type" name="searchType" value={searchType} handleChange={handleSearch} list={['all',...statusOptions]}/>
            <FormRowSelect labelText="Sort By" name="sort" value={sort} handleChange={handleSearch} list={sortOptions}/>
            <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>
        </div>
       </form>
       </Wrapper>
    )
}

export default SearchContainer