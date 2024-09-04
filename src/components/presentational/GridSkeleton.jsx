import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {ContainerTitle, ContainerCards} from '../../assets/styles/GridSkeleton.styles'


const GridSkeleton = () => {
  return (
    <>
      <ContainerTitle>
        <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
        <Skeleton animation="wave"  variant="rectangular" height={60} />
      </ContainerTitle>
      <ContainerCards>
        <Card sx={{ width: 345, marginBottom: 2 }}>
          <CardHeader
            avatar={
              <Skeleton  animation="wave" variant="circular" width={40} height={40} />
            }
            title={
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
            }
            subheader={
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
            }
          />
          <CardContent>
            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
          </CardContent>
        </Card>
        <Card sx={{ width: 345, marginBottom: 2 }}>
          <CardHeader
            avatar={
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
            }
            title={
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
            }
            subheader={
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
            }
          />
          <CardContent>
            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
          </CardContent>
        </Card>
        <Card sx={{ width: 345, marginBottom: 2 }}>
          <CardHeader
            avatar={
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
            }
            title={
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
            }
            subheader={
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
            }
          />
          <CardContent>
            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
          </CardContent>
        </Card>
        <Card sx={{ width: 345, marginBottom: 2 }}>
          <CardHeader
            avatar={
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
            }
            title={
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
            }
            subheader={
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
            }
          />
          <CardContent>
            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
          </CardContent>
        </Card>
      </ContainerCards>
    </>
  )
}

export default GridSkeleton
