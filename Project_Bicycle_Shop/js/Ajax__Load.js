(function (global) {

        var ns = {}; //new site

        var homeHtml = "snippets/Main__Home.html"; //Посилання на сніпет
        var allCategoriesUrl = "db/Catalog.json";
        var categoriesTitleHtml = "snippets/Category__Title.html";
        var categoryHtml = "snippets/Category__Item.html";

        var catalogItemsUrl = "db/categories/";
        var catalogItemsTitleHtml = "snippets/Product__Title.html";
        var catalogItemHtml = "snippets/Product__Item.html";

        // Convenience function for inserting innerHTML fot 'select'
        var insertHtml = function (selector, html) {
            var targetElem = document.querySelector(selector);
            targetElem.innerHTML = html;
        };

        // Show loading icon inside element identified by 'selector'
        var showLoading = function (selector) {
            var html = "<div class='text-center loader__position'>";
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


        //On page load (before images or CSS)
        document.addEventListener("DOMContentLoaded", function (event) {

            //On first load, show home view
            showLoading("#Main__Home");
            $ajaxUtils.sendGetRequest(homeHtml, function (responseText) {
                document.querySelector("#Main__Home").innerHTML = responseText;
            }, false); //Інформація береться із сервера якщо false

        });

        // Load the menu categories view
        ns.loadCatalogCategories = function () {
            showLoading("#Main__Home");

            $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
        };

        //Завантаження головної сторінки
        ns.loadHome = function () {
            showLoading("#Main__Home"); //Підтягування гіфки завантажувача
            $ajaxUtils.sendGetRequest(homeHtml, function (responseText) {

                //Switch CSS class active to menu button
                switchHomeToActive();

                document.querySelector("#Main__Home").innerHTML = responseText;
            }, false); //Інформація береться із сервера якщо false
        };

        // Builds HTML for the categories page based on the data
        // from  the server
        function buildAndShowCategoriesHTML(categories) {
            // Load title snippet of categories page
            $ajaxUtils.sendGetRequest(categoriesTitleHtml, function (categoriesTitleHtml) {
                // Retrieve single category snippet
                $ajaxUtils.sendGetRequest(categoryHtml, function (categoryHTML) {

                    //Switch CSS class active to menu button
                    switchCatalogToActive();

                    var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHTML);
                    insertHtml("#Main__Home", categoriesViewHtml); // Буде вставлено сніпет категорій замість головної сторінки
                }, false);
            }, false);
        }

        //Using categories data and snippets html
        // build categories view HTML to be inserted into page
        function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {

            var finalHTML = categoriesTitleHtml;
            finalHTML += "<div class='container p-0'>"; //Додаємо контейнер до сторінки
            finalHTML += "<section class='row'>";

            // Loop over categories
            for (var i = 0; i < categories.length; i++) {
                // Insert category values
                var html = categoryHtml;
                var name = "" + categories[i].name;
                var short_name = categories[i].short_name;
                html = insertProperty(html, "name", name);
                html = insertProperty(html, "short_name", short_name);
                finalHTML += html;
            }

            finalHTML += "</section>";
            finalHTML += "</div>";
            return finalHTML;
        }

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

                    //Switch CSS class active to menu button
                    switchCatalogToActive();

                    var catalogItemsViewHtml = buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemTitleHtml, catalogItemHtml);
                    insertHtml("#Main__Home", catalogItemsViewHtml);
                }, false);
            }, false);
        }

        // Using category and catalog items data and snippets html
        // build catalog items view HTML to be inserted into page
        function buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemsTitleHtml, catalogItemHtml) {

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "name", categoryCatalogItems.category.name);

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "special_instructions", categoryCatalogItems.category.special_instructions);

            var finalHtml = catalogItemsTitleHtml;

            finalHtml += "<div class='container p-0'>"; //Додаємо контейнер до сторінки
            finalHtml += "<section class='row'>";

            // Loop over catalog items
            var catalogItems = categoryCatalogItems.catalog_items;
            var catShort_name = categoryCatalogItems.category.short_name;
            for (var i = 0; i < catalogItems.length; i++) {
                //Insert catalog item values
                var html = catalogItemHtml;

                html = insertProperty(html, "short_name", catalogItems[i].short_name);

                html = insertProperty(html, "catShort_name", catShort_name);

                html = insertItemPrice(html, "price_retail", catalogItems[i].price_retail);

                html = insertItemAmount(html, "amount_retail", catalogItems[i].amount_retail);

                html = insertItemPrice(html, "price_wholesale", catalogItems[i].price_wholesale);

                html = insertItemAmount(html, "amount_wholesale", catalogItems[i].amount_wholesale);

                html = insertProperty(html, "name", catalogItems[i].name);

                html = insertProperty(html, "description", catalogItems[i].description);

                finalHtml += html;
            }

            finalHtml += "</section>";
            finalHtml += "</div>";
            return finalHtml;
        }

        // Appends price with '$' if price exists
        function insertItemPrice(html, pricePropName, priceValue) {
            // If not specified, replace with empty string
            if (!priceValue) {
                return insertProperty(html, pricePropName, "");
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

        var switchCatalogToActive = function () {
            // Remove 'active' from home button
            var classes = document.querySelector("#Nav__LinkHome").className;
            classes = classes.replace(new RegExp("active", "g"), "");
            document.querySelector("#Nav__LinkHome").className = classes;

            // Add 'active' to menu button if not already there
            classes = document.querySelector("#Nav__LinkCategory").className;
            if (classes.indexOf("active") === -1) {
                classes += " active";
                document.querySelector("#Nav__LinkCategory").className = classes;
            }
        };

        var switchHomeToActive = function () {
            // Remove 'active' from catalog button
            var classes = document.querySelector("#Nav__LinkCategory").className;
            classes = classes.replace(new RegExp("active", "g"), "");
            document.querySelector("#Nav__LinkCategory").className = classes;

            // Add 'active' to menu button if not already there
            classes = document.querySelector("#Nav__LinkHome").className;
            if (classes.indexOf("active") === -1) {
                classes += " active";
                document.querySelector("#Nav__LinkHome").className = classes;
            }
        };

        //Завантаження випадкової категорії з товарами
        ns.loadSpecials = function (categoryShort) {
            showLoading("#Main__Home");
            /*
            var categoriesJSON = ["A", "B", "C", "D", "E", "F"];
                        var randCategory = Math.floor(Math.random() * categoriesJSON.length);
                        // Повертається число тобто 0,1,2...5
            */
            var randomCategoriesJSON = ["A", "B", "C", "D", "E", "F"].find((_, i, ar) => Math.random() < 1 / (ar.length - i));//ES6
            $ajaxUtils.sendGetRequest(catalogItemsUrl + randomCategoriesJSON + ".json", buildAndShowCatalogItemsHTML);
        };

        global.$ns = ns;

    }
)(window);