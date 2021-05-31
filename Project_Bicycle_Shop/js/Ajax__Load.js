(function (global) {

        /*______________________________________________
        Variables
        *--------------------------------------------*/
        var ns = {}; //new site

        var homeCategoriesBikeHTML = "snippets/Page1.html"; //Посилання на сніпет

        var allCategoriesUrl = "db/CatalogBike.json";

        var catalogItemsUrl = "db/CatalogBike/";
        var catalogItemsTitleHtml = "snippets/CatalogBike__ProductTitle.html";
        var catalogItemHtml = "snippets/Page2.html";

        var NewsSection__Title = "snippets/News__Title.html";
        var NewsSection = "snippets/News__Snippets.html";
        var NewsSection__db = "db/News.json";

        var NewsItemsUrl__db = "db/NewsItem/";
        var NewsItemsTitleHtml = "snippets/Page__News__Title.html";
        var NewsItemHtml = "snippets/Page__News.html";


        /*______________________________________________
        * Function help
        * --------------------------------------------*/

// Convenience function for inserting innerHTML fot 'select'
        var insertHtml = function (selector, html) {
            var targetElem = document.querySelector(selector);
            targetElem.innerHTML = html;
        };

// Show loading icon inside element identified by 'selector'
        var showLoading = function (selector) {
            var html = "<div class='text-center Margin__Position__Load'>";
            html += "<img src='img/Ajax__Loading.gif' alt='loading' ></div";
            insertHtml(selector, html);
        };

// Return substitude of '{{propName}}'
// with propValue in given 'string'
        var insertProperty = function (string, propName, propValue) {
            var propToReplace = "{{" + propName + "}}";
            string = string.replace(new RegExp(propToReplace, "g"), propValue);
            return string;
        };

        /*______________________________________________
        Page1
        --------------------------------------------*/

//On page load (before images or CSS)
        document.addEventListener("DOMContentLoaded", function (event) {
//On first load, show home view
            showLoading("#Main__Home");

            $ajaxUtils.sendGetRequest(homeCategoriesBikeHTML, function (responseText) {
                document.querySelector("#Main__Home").innerHTML = responseText;
            }, false); //Інформація береться із сервера якщо false

        });

//Завантаження головної сторінки зі всім
        ns.loadHome = function () {
            showLoading("#Main__Home"); //Підтягування гіфки завантажувача
            $ajaxUtils.sendGetRequest(homeCategoriesBikeHTML, function (responseText) {
                document.querySelector("#Main__Home").innerHTML = responseText;
            }, false);
            $ajaxUtils.sendGetRequest(NewsSection__db, buildAndShowNewsHTML); //Підключаємо Базу даних
        }

        /*----------------------------------------
        * CatalogBike
        -----------------------------------------*/

//  Завантаження для кожної з категорій свою базу даних
// Load the catalog items view
// 'categoryShort' is a short_name for a category
        ns.loadCatalogItems = function (categoryShort) {
            showLoading("#Main__Home");
            $ajaxUtils.sendGetRequest(catalogItemsUrl + categoryShort + ".json", buildAndShowCatalogItemsHTML);
        };

// Builds HTML for the single category page based on the data
// from the server
        function buildAndShowCatalogItemsHTML(categoryCatalogItems) {
// Load title snippet of catalog items page
            $ajaxUtils.sendGetRequest(catalogItemsTitleHtml, function (catalogItemTitleHtml) {
// Retrieve simple catalog item snippet
                $ajaxUtils.sendGetRequest(catalogItemHtml, function (catalogItemHtml) {


                    var catalogItemsViewHtml = buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemTitleHtml, catalogItemHtml);
                    insertHtml("#Main__Home", catalogItemsViewHtml);
                }, false);
            }, false);
        }

// Using category and catalog items data and snippets html
// build catalog items view HTML to be inserted into page
        function buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemsTitleHtml, catalogItemHtml) {

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "name", categoryCatalogItems.CatalogBike.name);

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "UrlBgPage2__Bike", categoryCatalogItems.CatalogBike.UrlBgPage2__Bike);

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "special_instructions", categoryCatalogItems.CatalogBike.special_instructions);

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "special_instructions2", categoryCatalogItems.CatalogBike.special_instructions2);

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "short_name", categoryCatalogItems.CatalogBike.short_name);

            var finalHtml = catalogItemsTitleHtml;
            finalHtml += "<div class='container-fluid p-0'>";
            finalHtml += "<div class='row'>";

// Loop over catalog items
            var catalogItems = categoryCatalogItems.CatalogBikeItems;
            var catShort_name = categoryCatalogItems.CatalogBike.short_name;
            for (var i = 0; i < catalogItems.length; i++) {
//Insert catalog item values
                var html = catalogItemHtml;

                html = insertProperty(html, "short_name", catalogItems[i].short_name);

                html = insertProperty(html, "catalogShort_name", catShort_name);

                html = insertItemPrice(html, "price_retail", catalogItems[i].price_retail);

                html = insertItemAmount(html, "amount_retail", catalogItems[i].amount_retail);

                html = insertItemPrice(html, "price_wholesale", catalogItems[i].price_wholesale);

                html = insertItemAmount(html, "amount_wholesale", catalogItems[i].amount_wholesale);

                html = insertProperty(html, "CodeItem", catalogItems[i].CodeItem);

                html = insertProperty(html, "ColorBlack", catalogItems[i].ColorBlack);

                html = insertProperty(html, "ColorBlue", catalogItems[i].ColorBlue);

                html = insertProperty(html, "ColorYellow", catalogItems[i].ColorYellow);

                html = insertProperty(html, "name", catalogItems[i].name);

                html = insertProperty(html, "description", catalogItems[i].description);

                finalHtml += html;
            }

            finalHtml += "</div>";
            finalHtml += "</div>";

            return finalHtml;
        }

        /*______________________________________________
        * Items CatalogBike
        * --------------------------------------------*/

// Appends price with '$' if price exists
        function insertItemPrice(html, pricePropName, priceValue) {
// If not specified, replace with empty string
            if (!priceValue) {
                return insertProperty(html, pricePropName, "$");
            }
            priceValue = "$" + priceValue.toFixed(2);
            html = insertProperty(html, pricePropName, priceValue);
            return html;
        }

// Appends portion name in parens if it exists
        function insertItemAmount(html, amountPropName, amountValue) {
// If not specified, replace original string
            if (!amountValue) {
                return insertProperty(html, amountPropName, "");
            }
            amountValue = "(" + amountValue + ")";
            html = insertProperty(html, amountPropName, amountValue);
            return html;
        }

        /*-----------------------------------------------
        * News Section
        * ----------------------------------------------*/

        document.addEventListener("DOMContentLoaded", function (event) {
            $ajaxUtils.sendGetRequest(NewsSection__db, buildAndShowNewsHTML); //Підключаємо Базу даних
        });

// Builds HTML for the categories page based on the data
// from  the server
        function buildAndShowNewsHTML(NewsItemsSection) {
// Load title snippet of categories pag
            $ajaxUtils.sendGetRequest(NewsSection__Title, function (NewsTitleHtml) {
// Retrieve single category snippet
                $ajaxUtils.sendGetRequest(NewsSection, function (NewsSectionHtml) {


                    var NewsViewHtml = buildNewsViewHtml(NewsItemsSection, NewsTitleHtml, NewsSectionHtml);
                    insertHtml("#News__Section", NewsViewHtml); // Буде вставлено сніпет категорій замість головної сторінки
                }, false);
            }, false);
        }

//Using categories data and snippets html
// build categories view HTML to be inserted into page
        function buildNewsViewHtml(NewsItemsSection, NewsTitleHtml, NewsSectionHtml) {

            var finalHTML = NewsTitleHtml;
            finalHTML += "<div class='row'>";

// Loop over categories
            for (var i = 0; i < NewsItemsSection.length; i++) {
// Insert category values
                var html = NewsSectionHtml;
                var name = "" + NewsItemsSection[i].name;
                var short_name = NewsItemsSection[i].short_name;
                var short_name_2 = NewsItemsSection[i].short_name_2;
                var special_instructions = NewsItemsSection[i].special_instructions;

                html = insertProperty(html, "name", name);
                html = insertProperty(html, "short_name", short_name);
                html = insertProperty(html, "short_name_2", short_name_2);
                html = insertProperty(html, "special_instructions", special_instructions);

                finalHTML += html;
            }
            finalHTML += "</div>";

            return finalHTML;
        }

        /*-----------------------------------------------
        * Catalog News Section
        * ----------------------------------------------*/

//Завантаження сторінки з новинами
//  Завантаження для кожної з категорій свою базу даних
// Load the catalog items view
// 'categoryShort' is a short_name for a category
        ns.loadPage__News = function (categoryShort) {
            showLoading("#Main__Home"); //Підтягування гіфки завантажувача
            $ajaxUtils.sendGetRequest(NewsItemsUrl__db + categoryShort + ".json", buildAndShowNewsItemHTML);
        }

// Builds HTML for the single category page based on the data
// from the server
        function buildAndShowNewsItemHTML(NewsItemsSection) {
// Load title snippet of catalog items page
            $ajaxUtils.sendGetRequest(NewsItemsTitleHtml, function (NewsItemsTitleHtml) {
// Retrieve simple catalog item snippet
                $ajaxUtils.sendGetRequest(NewsItemHtml, function (NewsItemHtml) {
                    var Page__News__Item__ViewHtml = buildPageNewsItemsViewHtml(NewsItemsSection, NewsItemsTitleHtml, NewsItemHtml);
                    insertHtml("#Main__Home", Page__News__Item__ViewHtml);
                }, false);
            }, false);
        }

// Using category and catalog items data and snippets html
// build catalog items view HTML to be inserted into page
        function buildPageNewsItemsViewHtml(NewsItemsSection, NewsItemsTitleHtml, NewsItemHtml) {

            NewsItemsTitleHtml = insertProperty(NewsItemsTitleHtml, "NameNews", NewsItemsSection.News.name);

            var finalHtml = NewsItemsTitleHtml;

            finalHtml += "<div class='container-fluid p-0'>";

            finalHtml += "<div class='row'>";


// Loop over catalog items
            var catalogNews__Items = NewsItemsSection.NewsItems;
            var catShort_name = NewsItemsSection.News.short_name;

            for (var i = 0; i < catalogNews__Items.length; i++) {
//Insert catalog item values
                var html = NewsItemHtml;

                html = insertProperty(html, "short_name", catalogNews__Items[i].short_name); //Також потрібне для підвантаження потрібного файлу json

                html = insertProperty(html, "catalogShort_name", catShort_name);


                html = insertProperty(html, "ArticleName", catalogNews__Items[i].ArticleName);

                html = insertProperty(html, "ArticleDescription", catalogNews__Items[i].ArticleDescription);

                finalHtml += html;
            }

            finalHtml += "</div>";
            finalHtml += "</div>";
            finalHtml += "</div>";
            return finalHtml;
        }

        global.$ns = ns;

    }
)
(window);