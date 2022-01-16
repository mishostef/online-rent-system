import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { IUser } from '../models/IUser';
import { useState } from 'react';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },

        llogo: {
            fontFamily: 'The Nautigal, cursive',
        },

        logout: {
            background: 'none',
            color: 'white',
            border: 'none',
            fontFamily: 'The Nautigal, cursive',
            textDecoration: 'underline',
            cursor: 'pointer',
        }
    }),
);

const PrimarySearchAppBar: React.FC<{ user: IUser }> = ({ user }) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
        navigate('/profile')
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );


    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <span className={classes.llogo}>Rent System </span>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow}>
                        <ul className="nav-links">
                            <li className="white">
                                <NavLink to="/" className="active">Home</NavLink>
                            </li>
                            <li className="white">
                                <NavLink to="/login" className="active">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" className="active">Register</NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" className="active">Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/add-advertisement" className="active">Add Addvertisement</NavLink>
                            </li>
                        </ul>
                    </div>
                    <button name="logout" className={classes.logout} onClick={handleLogout}>Logout</button>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            <span className={classes.llogo}>Hello,{user.email}</span>
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

export default PrimarySearchAppBar;