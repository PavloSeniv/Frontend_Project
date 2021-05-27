(function (global) {

        var ns = {}; //new site

        var homeCategoriesBikeHTML = "snippets/Page1.html"; //Посилання на сніпет

        /* var allCategoriesUrl = "db/CatalogBike.json";
         var categoriesTitleHtml = "snippets/Category__Title.html";
         */

        var catalogItemsUrl = "db/CatalogBike/";
        var catalogItemsTitleHtml = "snippets/CatalogBike__ProductTitle.html";
        var catalogItemHtml = "snippets/Page2.html";

        var ItemHtml = "snippets/Page3_Snippets.html";


        // Convenience function for inserting innerHTML fot 'select'
        var insertHtml = function (selector, html) {
            var targetElem = document.querySelector(selector);
            targetElem.innerHTML = html;
        };

        // Show loading icon inside element identified by 'selector'
        var showLoading = function (selector) {
            var html = "<div class='text-center'>";
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

            $ajaxUtils.sendGetRequest(homeCategoriesBikeHTML, function (responseText) {
                document.querySelector("#Main__Home").innerHTML = responseText;
            }, false); //Інформація береться із сервера якщо false

        });

        //Завантаження головної сторінки
        ns.loadHome = function () {
            showLoading("#Main__Home"); //Підтягування гіфки завантажувача
            $ajaxUtils.sendGetRequest(homeCategoriesBikeHTML, function (responseText) {
                //Switch CSS class active to menu button
                switchHomeToActive();

                document.querySelector("#Main__Home").innerHTML = responseText;
            }, false); //Інформація береться із сервера якщо false
        }

        /*document.addEventListener("DOMContentLoaded", function (event) {
            //On first load, show home view
            showLoading("#Main__Home");

            $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
        });

        /!* //Динамічне завантаження категорій у слайдері на 1 сторінці
         // Load the menu categories view
         ns.loadCatalogCategories = function () {
             showLoading("#carouselExampleInterval");

             $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
         };*!/

        // Builds HTML for the categories page based on the data
        // from  the server
        function buildAndShowCategoriesHTML(categories) {
            // Load title snippet of categories page
            $ajaxUtils.sendGetRequest(categoriesTitleHtml, function (categoriesTitleHtml) {
                // Retrieve single category snippet
                $ajaxUtils.sendGetRequest(homeCategoriesBikeHTML, function (categoryHTML) {

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
            // Loop over categories
            for (var i = 0; i < categories.length; i++) {
                // Insert category values
                var html = categoryHtml;
                var name = "" + categories[i].name;
                var short_name = categories[i].short_name;
                var short_name_2 = categories[i].short_name_2;

                html = insertProperty(html, "name", name);
                html = insertProperty(html, "short_name", short_name);
                html = insertProperty(html, "short_name_2", short_name_2);

                finalHTML += html;
            }
            return finalHTML;
        }*/

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

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "name", categoryCatalogItems.CatalogBike.name);

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "special_instructions", categoryCatalogItems.CatalogBike.special_instructions);

            var finalHtml = catalogItemsTitleHtml;

            finalHtml += "<section class='row'>";

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

                html = insertProperty(html, "name", catalogItems[i].name);

                html = insertProperty(html, "description", catalogItems[i].description);

                finalHtml += html;
            }

            finalHtml += "</section>";
            return finalHtml;
        }


        //Завантаження головної сторінки
        ns.loadItems = function () {
            showLoading("#Main__Home"); //Підтягування гіфки завантажувача
            $ajaxUtils.sendGetRequest(ItemHtml, function (responseText) {
                //Switch CSS class active to menu button
                switchHomeToActive();

                document.querySelector("#Main__Home").innerHTML = responseText;
            }, false); //Інформація береться із сервера якщо false
        }

        /*  //  Завантаження кожного айтема
          // Load the catalog items view
          // 'categoryShort' is a short_name for a category
          ns.loadItems = function (categoryShort) {
              showLoading("#Main__Home");
              $ajaxUtils.sendGetRequest(catalogItemsUrl + categoryShort + ".json", buildAndShowItemsHTML);
          };

          // Builds HTML for the single category page based on the data
          // from the server
          function buildAndShowItemsHTML(categoryCatalogItems) {
              // Load title snippet of catalog items page
              $ajaxUtils.sendGetRequest(catalogItemsTitleHtml, function (catalogItemTitleHtml) {
                  // Retrieve simple catalog item snippet
                  $ajaxUtils.sendGetRequest(ItemHtml, function (catalogItemHtml) {

                      //Switch CSS class active to menu button
                      switchCatalogToActive();

                      var catalogItemsViewHtml = buildItemsViewHtml(categoryCatalogItems, catalogItemTitleHtml, catalogItemHtml);
                      insertHtml("#Main__Home", catalogItemsViewHtml);
                  }, false);
              }, false);
          }

          // Using category and catalog items data and snippets html
          // build catalog items view HTML to be inserted into page
          function buildItemsViewHtml(categoryCatalogItems, catalogItemsTitleHtml, catalogItemHtml) {

              catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "name", categoryCatalogItems.CatalogBike.name);

              catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "special_instructions", categoryCatalogItems.CatalogBike.special_instructions);

              var finalHtml = catalogItemsTitleHtml;

              finalHtml += "<section class='row'>";

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

                  html = insertProperty(html, "name", catalogItems[i].name);

                  html = insertProperty(html, "description", catalogItems[i].description);

                  finalHtml += html;
              }

              finalHtml += "</section>";
              return finalHtml;
          }*/

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


        var switchCatalogToActive = function () {
            // Remove 'active' from home button
            var classes = document.querySelector("#nav-link-home").className;
            classes = classes.replace(new RegExp("active", "g"), "");
            document.querySelector("#nav-link-home").className = classes;

            // Add 'active' to menu button if not already there
            classes = document.querySelector("#nav-link-category1").className;
            if (classes.indexOf("active") === -1) {
                classes += " active";
                document.querySelector("#nav-link-category1").className = classes;
            }
        };

        var switchHomeToActive = function () {
            // Remove 'active' from catalog button
            var classes = document.querySelector("#nav-link-category1").className;
            classes = classes.replace(new RegExp("active", "g"), "");
            document.querySelector("#nav-link-category1").className = classes;

            // Add 'active' to menu button if not already there
            classes = document.querySelector("#nav-link-home").className;
            if (classes.indexOf("active") === -1) {
                classes += " active";
                document.querySelector("#nav-link-home").className = classes;
            }
        };

        /*//Завантаження випадкової категорії з товарами Ідея зробити випадкове завантаження фото на головній сторінці
        ns.loadSpecials = function (categoryShort) {
            showLoading("#Main__Home");
            /!*
            var categoriesJSON = ["A", "B", "C", "D", "E", "F"];
                        var randCategory = Math.floor(Math.random() * categoriesJSON.length);
                        // Повертається число тобто 0,1,2...5
            *!/
            var randomCategoriesJSON = ["A", "B", "C", "D", "E", "F"].find((_, i, ar) => Math.random() < 1 / (ar.length - i));//ES6
            $ajaxUtils.sendGetRequest(catalogItemsUrl + randomCategoriesJSON + ".json", buildAndShowCatalogItemsHTML);
        };
*/
        global.$ns = ns;

    }
)(window);