import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

const foo = [
    {
        title: "Project",
        description: ["Team", "History", "Contact us", "Locations"],
    },
    {
        title: "Project Features",
        description: ["Cool stuff", "Random feature", "Team feature", "Developer stuff"],
    },
    {
        title: "Resources",
        description: ["Resource", "Resource name", "Another resource", "Final resource"],
    },
    {
        title: "Legal",
        description: ["Privacy policy", "Terms of use"],
    },
];
function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {"Copyright © "}
            <Link color="inherit" href="#">
                tajziya.org
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const Footer = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <CssBaseline />
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 50,
                    py: [3, 6],
                }}
            >
                <Grid container spacing={4} justifyContent="space-evenly">
                    {foo.map((foo) => (
                        <Grid item xs={6} sm={3} key={foo.title}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                {foo.title}
                            </Typography>
                            <ul>
                                {foo.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="text.secondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: "auto",
                    backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800]),
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">Welcome to Tajziya.org</Typography>
                    <Copyright />
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
