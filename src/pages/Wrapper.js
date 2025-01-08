import styled from 'styled-components'

const Wrapper = styled.main`
nav{
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  height: var(--nav-height);
  display: flex;
  align-items: center;
}
.banner{
  min-height: calc(100vh - var(--nav-height));
  display: grid;
  align-items: center;
  margin-top: -3rem;
  .info{
    h1{font-weight:700}
  }
  .main-banner{
    display: none;
  }
}
.errorPage{
  text-align: center;
  min-height: 100vh;

  img{max-width:250px;margin:auto}
  p{margin:auto}
}
.member-btn{
  background-color: transparent;
  border: transparent;
  color: var(--primary-500);
  cursor: pointer;
}
@media (min-width: 992px){
  .banner{
    grid-template-columns: 1fr 1fr;
    .main-banner{
      display: block;
    }
  }
}
`;

export default Wrapper