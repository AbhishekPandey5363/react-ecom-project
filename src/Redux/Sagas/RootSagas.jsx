import { all } from "redux-saga/effects"

import maincategorySagas from "./MaincategorySagas";
import subcategorySagas from "./SubcategorySagas";
import brandSagas from "./BrandSagas";
import testimonialSagas from "./TestimonialSagas ";
import productSagas from "./ProductSagas";
import CartSagas from "./CartSagas";
import WishlistSagas from "./WishlistSagas";
import NewsletterSagas from "./NewsletterSagas";
import CheckoutSagas from "./CheckoutSagas";
import ContactUsSagas from "./ContactUsSagas";
export default function* RootSaga() {
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        testimonialSagas(),
        productSagas(),
        CartSagas(),
        WishlistSagas(),
        NewsletterSagas(),
        CheckoutSagas(),
        ContactUsSagas()
    ])
}