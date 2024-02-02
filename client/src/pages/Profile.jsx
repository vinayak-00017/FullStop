import { Box, Grid, Typography } from "@mui/material"

export const Profile = () => {
    return <Grid container spacing={5}>
        <Grid item xs={4}>
            <Typography>
                User Profile
            </Typography>
        </Grid>
        <Grid item xs={8}>
            <Typography>
                Orders
            </Typography>
        </Grid>
    </Grid>
}