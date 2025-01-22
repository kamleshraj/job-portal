import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabsContent from '../components/TabsContent'

const CustomTabs=({tabs})=>{
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
          {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} value={(index + 1).toString()} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            <TabsContent content={tab.Component} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default CustomTabs