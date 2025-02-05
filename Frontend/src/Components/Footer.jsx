import style from './Footer.module.css'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.wrapper}>
                <div className={style['logo-and-motto']}>
                    <div className={style.logo}>
                        <img src="/images/logo.png" alt="Logo" />
                    </div>
                    <div>Preserving Tradition, Empowering Artisans, and Celebrating Craftsmanship.</div>
                    <div className={style.icons}>
                        <a href="https://www.facebook.com" target='_blank' rel="noopener noreferrer">
                            <img src="/images/facebook_icon.svg" alt="facebook icon" />
                        </a>
                        <a href="https://www.twitter.com" target='_blank' rel="noopener noreferrer">
                            <img src="/images/twitter_icon.svg" alt="twitter icon" />
                        </a>
                        <a href="https://www.instagram.com" target='_blank' rel="noopener noreferrer">
                            <img src="/images/instagram_icon.svg" alt="instagram icon" />
                        </a>

                    </div>
                </div>
                <div className={style['shop-company-wrapper']}>

                    <div className={style['shop-company']}>
                        <h3>Shop</h3>
                        <div className={style.links}>
                            <Link to="#">Profile</Link>
                            <Link to="#">Log in</Link>
                            <Link to="#">Wishlist</Link>
                            <Link to="#">Checkout</Link>
                        </div>
                    </div>
                    <div className={style['shop-company']}>
                        <h3>Company</h3>
                        <div className={style.links}>
                            <Link to="#">Wishlist</Link>
                            <Link to="#">Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.copyright}>&copy; copyright {new Date().getFullYear()} Heritage Craft Connect</div>
        </footer>


    );
}