import { useSelector, useDispatch } from 'react-redux';
import FormRowSelect from './FormRowSelect';
import FormRow from './FormRow';
import Wrapper from '../assets/wrapper/searchContainer';
import { clearFilters, filterJobs, handleChange } from '../features/allJobs/allJobsSlice';
import { useEffect } from 'react';

const SearchContainer=()=>{
    const {isLoading, search, searchStatus, searchType, sort, sortOptions} = useSelector((store)=>store.allJobs);

    const {statusOptions,jobTypeOptions} = useSelector((store)=>store.job)
    const dispatch = useDispatch();

    const handleSearch=(e)=>{
        if(isLoading) return;
        dispatch(handleChange({name:e.target.name, value:e.target.value}))
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(clearFilters())
    }
    useEffect(() => {
        dispatch(filterJobs());
      }, [search, searchStatus, searchType, sort, dispatch]);
    return(
       <Wrapper>
       <form className='form'>
        <div className='form-center'>
            <div className='search-box'>
                <FormRow type="text" labelText="Search" name="search" value={search} handleChange = {handleSearch}/>
            </div>
            {/* <FormRowSelect labelText="Status" name="searchStatus" value={searchStatus} handleChange={handleSearch} list={['all',...statusOptions]}/> */}
            <FormRowSelect labelText="Type" name="searchType" value={searchType} handleChange={handleSearch} list={['all',...jobTypeOptions]}/>
            <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>
        </div>
       </form>
       </Wrapper>
    )
}

export default SearchContainer