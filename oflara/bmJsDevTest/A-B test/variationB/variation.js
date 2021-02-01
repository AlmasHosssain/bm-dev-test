(function() {

    //Show/Hide error flag.
    var consoleFlag = true;

    //Show Error message in the Console
    function showErrorMessage(error) {
        if (consoleFlag) {
            return console.log(error.message);
        }
    }

    //Select Element (by using className & idName).
    try {
        function selectByClassName(className) {
            return document.getElementsByClassName(className)
        }

        function selectByElementIdName(idName) {
            return document.getElementById(idName)
        }
    } catch (error) {
        showErrorMessage(error);
    }


    //Create Element on the DOM.
    function createElement(tagName, innerHTML, ownGivenClassName) {
        try {
            var createdElement = document.createElement(tagName);
            createdElement.innerHTML = innerHTML || '';
            createdElement.classList = ownGivenClassName || '';
            return createdElement;
        } catch (error) {
            showErrorMessage(error);
        }
    }

    //Select all AddToCartButton.
    var selectedList = Array.from(selectByClassName('add_to_cart_button'));

    //Show QuickViewButton on the collection page
    selectedList.forEach(function(singleBtn) {
        try {
            var showQuickViewButton = createElement('a', 'Quick View', 'bl-quickViewButton');
            showQuickViewButton.style.backgroundColor = 'rgb(146, 143, 143)';
            singleBtn.insertAdjacentElement('beforebegin', showQuickViewButton);
        } catch (error) {
            showErrorMessage(error);
        }

    })

    //Select All QuickViewButton Upon AddToCartButton.
    var quickViewButtonList = Array.from(selectByClassName('bl-quickViewButton'));


    //Create single PopUp for each product on the collection page.
    quickViewButtonList.forEach(function(singleQuickViewButton) {
        singleQuickViewButton.addEventListener('click', function(event) {
            try {
                var quickViewDiv = createElement('div');
                handelPopUp('jas-wrapper', quickViewDiv, 'closePopUp', event);
            } catch (error) {
                showErrorMessage(error);
            }
        })
    })

    // Place/remove the PopUpBox to/from the DOM based on the QuickViewButton Click.
    function handelPopUp(popUpHolderIdName, popUpBoxName, popUpCloseBtnIdName, event) {
        try {
            var popUpHolder = selectByElementIdName(popUpHolderIdName);
            popUpHolder.appendChild(popUpBoxName); //Open PopUp
            popUpBody(popUpBoxName, event); //PopUp Body
            popUpCloseFunction(popUpCloseBtnIdName, popUpHolder, popUpBoxName); //Close PopUp. 
        } catch (error) {
            showErrorMessage(error);
        }
    }


    //Close popUp function
    function popUpCloseFunction(popUpCloseBtnIdName, popUpHolder, popUpBox) {
        try {
            var closeBtn = selectByElementIdName(popUpCloseBtnIdName);
            return closeBtn.addEventListener('click', function(event) {
                popUpHolder.removeChild(popUpBox);
            })
        } catch (error) {
            showErrorMessage(error);
        }

    }

    //Dynamically Create PopUp Elements
    function popUpBody(popUpBody, event) {
        try {
            //Get product image to set dynamically on the popUp
            getImageUriDynamically(event);

            //Get Product Name to set dynamically on the popUp
            getProductName(event);

            //Get review-star and review-number to set dynamically on the popUp
            getReviewStar(event);
            getReviewNumber(event);

            //Get product-price to set dynamically on the popUp
            getCorrectPrice(event);

            //Get PopUp body HTML to set dynamically on the popUpBox
            popUpBodyMakingFunction(popUpBody, backGroundImageLink, productName, reviewStar, reviewNumber, setPrice);
        } catch (error) {
            showErrorMessage(error);
        }
    }

    //Get clicked product Image Url to set on it's popUp
    function getImageUriDynamically(event) {
        try {
            return backGroundImageLink = String(event.target.parentElement.previousElementSibling.firstElementChild.firstElementChild.src);
        } catch (error) {
            showErrorMessage(error);
        }
    }

    //Get clicked product name to set on it's popUp
    function getProductName(event) {
        try {
            return productName = event.target.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.innerText
        } catch (error) {
            showErrorMessage(error);
        }
    }

    //Get clicked product reviewStar to set on it's popUp
    function getReviewStar(event) {
        try {
            return reviewNumber = event.target.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.lastElementChild.innerText
        } catch (error) {
            showErrorMessage(error);
        }
    }


    //Get clicked product reviewNumber to set on it's popUp
    function getReviewNumber(event) {
        try {
            return reviewStar = event.target.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerHTML
        } catch (error) {
            showErrorMessage(error);
        }
    }

    //Get clicked product price to set on it's popUp
    function getCorrectPrice(event) {
        try {
            var selectCurrentPrice = event.target.parentElement.parentElement.nextElementSibling.lastElementChild;
            if (selectCurrentPrice.innerHTML.indexOf('<') != -1) {
                return setPrice = selectCurrentPrice.lastElementChild.innerHTML
            } else {
                return setPrice = selectCurrentPrice.innerHTML
            }
        } catch (error) {
            showErrorMessage(error);
        }
    }

    //Get clicked product HTML to set on it's popUp
    function popUpBodyMakingFunction(popUpBody, backGroundImageLink, productName, reviewStar, reviewNumber, setPrice) {

        try {
            var initialProductNumber = 1;
            popUpBody.classList.add('bl-PopupTest')
            popUpBody.style.display = 'block';

            popUpBody.innerHTML = `
            <div class="underlay"></div>
        <div class="modal">
            <div class="modal-body">
                <span class="bl-CloseBtn" id="closePopUp">X</span>
                <div class="bl-mainSection">
                    <h1 class="bl-name">${productName}</h1>
                    <div class="flex between-xs middle-xs bl-price-review">
                        <div>
                            <p class="price" id="productPrice">${setPrice}</p>
                        </div>
                        <a class="bl-shopify-rating">
                            <span class="spr-badge" data-rating="4.1">
                                <span class="spr-starrating spr-badge-starrating">
                                    ${reviewStar}
                                </span>
                                <span class="spr-badge-caption">
                                    ${reviewNumber}
                                </span>
                            </span>
                        </a>
                    </div>
                    <div class="bl-description">
                        <p>Those are the static data.Since it is a MultiPage application so it is quite impossible to fetch tha data from the detail page through the url.And I don't find any dom element in this page which contain the description innerText and I don't have any info about it's backend.</p>
                        <ul>
                            <li>Materials: Zinc Alloy</li>
                            <li>Stone: Swarovski Crystal</li>
                            <li><strong>Measurement:</strong></li>
                            <li>Length: 17.32 inches</li>
                            <li>Width: 0.86 inches</li>
                            <li>Plating: Rhodium</li>
                        </ul>
                    </div>


                    <div class="bl-quantityControlSection">
                        <div class="quantity t-quantity-selector pr fl mr__10" style="">
                            <input type="number" id="productQuantity"  min="1" max="11" readonly name="quantity" value= ${initialProductNumber} class="input-text qty tc">
                            <div class="qty tc">
                                <a class="plus db cb pa" id="plusBtn" href="javascript:void(0);">
                                    <i class="fa fa-plus"></i>
                                </a>
                                <a class="minus db cb pa"  id="subBtn" href="javascript:void(0);">
                                    <i class="fa fa-minus"></i>
                                </a>
                            </div>
                        </div>
                        <div class="add_full_width mt__15">
                            <button type="submit" id="add-to-cart" class="single_add_to_cart_button button alt">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="bl-review-container">
                <div class="bl-review">
                    <div class="spr-review-header">
                        <a class="shopify-product-rating">
                            <span class="spr-badge" data-rating="4.1">
                                <span class="spr-starrating spr-badge-starrating">
                                    <i class="spr-icon spr-icon-star"></i>
                                    <i class="spr-icon spr-icon-star"></i>
                                    <i class="spr-icon spr-icon-star"></i>
                                    <i class="spr-icon spr-icon-star"></i>
                                    <i class="spr-icon spr-icon-star-half-alt"></i>
                                </span>
                            </span>
                        </a>
                        <h3 class="bl-review-title">Angelic</h3>
                        <span class="bl-review-person"><strong>Alianna</strong> on <strong>Apr 24, 2018</strong></span>
                        <p class="bl-review-body">
                        It is a necklace which is beautiful, affordable and of great quality.
                        </p>
                    </div>
                </div>

                <div class="bl-review">
                <div class="spr-review-header">
                    <a class="shopify-product-rating">
                        <span class="spr-badge" data-rating="4.1">
                            <span class="spr-starrating spr-badge-starrating">
                                <i class="spr-icon spr-icon-star"></i>
                                <i class="spr-icon spr-icon-star"></i>
                                <i class="spr-icon spr-icon-star"></i>
                                <i class="spr-icon spr-icon-star"></i>
                                <i class="spr-icon spr-icon-star-half-alt"></i>
                            </span>
                        </span>
                    </a>
                    <h3 class="bl-review-title">Beautiful</h3>
                    <span class="bl-review-person"><strong>Kenzie Pratt</strong> on <strong>Aug 24, 2018</strong></span>
                    <p class="bl-review-body">
                        No complaints only praise from my side. Really loved the package.
                    </p>
                </div>
            </div>
            <div class="bl-review">
                <div class="spr-review-header">
                    <a class="shopify-product-rating">
                        <span class="spr-badge" data-rating="4.1">
                            <span class="spr-starrating spr-badge-starrating">
                                <i class="spr-icon spr-icon-star"></i>
                                <i class="spr-icon spr-icon-star"></i>
                                <i class="spr-icon spr-icon-star"></i>
                                <i class="spr-icon spr-icon-star"></i>
                                <i class="spr-icon spr-icon-star-empty-alt"></i>
                            </span>
                        </span>
                    </a>
                    <h3 class="bl-review-title">Captivating Indeed!</h3>
                    <span class="bl-review-person"><strong>Pernia</strong> on <strong>Apr 02, 2018</strong></span>
                    <p class="bl-review-body">
                    Quick delivery on top of free shipping is just amazing, Thank you.
                    </p>
                </div>
              </div>
            </div>      
        </div>
            `
            designObject = {
                backgroundImage: 'url(' + backGroundImageLink + ')',
                backgroundRepeat: 'no-repeat'
            };

            Object.assign(popUpBody.lastElementChild.style, designObject);
            return popUpBody;
        } catch (error) {
            showErrorMessage(error);
        }
    }

})();