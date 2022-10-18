import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'
function SearchExercises() {
  const [search, setSearch] = useState('')
  const [exercises, setExercises] = useState([])
  const [bodyParts, setBodyParts] = useEffect([])


  const handleSearch = async () => {
    //checking if search exists , someone as searched anything
    if (search) {
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      const SearchedExercises = exerciseData.filter(
        (exerciise) => exerciise.name.toLowerCase().include(search)
          || exerciise.target.toLowerCase().include(search)
          || exerciise.equipment.toLowerCase().include(search)
          || exerciise.bodyPart.toLowerCase().include(search)
      );
      setSearch('');
      setExercises(SearchedExercises);
    }
  }
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      p="20px"
    >
      <Typography fontWeight={700} sx={{
        fontSize: { lg: '44px', xs: '30px' }
      }} mb="50px" textAlign="center">
        Awesome Exercises you <br />should know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px'
            },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px'
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className='search-btn'
          sx={{
            bgcolor: '#ff2625',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0'
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%' }}>
        {/* <HorizontalScrollbar data={bodyParts} /> */}
      </Box>
    </Stack>
  )
}

export default SearchExercises