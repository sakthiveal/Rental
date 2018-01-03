'use strict';

angular.module('rentfinds.rentals', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/rentals', {
            templateUrl: 'rentals/rentals.html',
            controller: 'RentalsCtrl'
        }).
        when('/details/:id', {
            templateUrl: 'rentals/details.html',
            controller: 'DetailsCtrl',
        }).
        when('/add', {
            templateUrl: 'rentals/add.html',
            controller: 'RentalsCtrl'
        }).
        when('/edit/:id', {
            templateUrl: 'rentals/edit.html',
            controller: 'EditCtrl'
        })
    }])

    .controller('RentalsCtrl', ['$scope', '$firebaseArray','$location', function($scope, $firebaseArray,$location) {
        refresh();

        $scope.searchRentals = function(){
          var city =$scope.city;


        var ref = new Firebase('https://rent-186c6.firebaseio.com/rentals');
        var query={
          "city":city
        }
        $scope.rentals = $firebaseArray(ref.orderByChild('city').equalTo(city));

        $scope.showLatest=false;
        $scope.showResults=true;
        }
        $scope.addRental = function() {
            if ($scope.title) { var title = $scope.title; } else { var title = null; }
            if ($scope.phone) { var phone = $scope.phone; } else { var phone = null; }
            if ($scope.email) { var email = $scope.email; } else { var email = null; }
            if ($scope.street_address) { var street_address = $scope.street_address; } else { var street_address = null; }
            if ($scope.city) { var city = $scope.city; } else { var title = null; }
            if ($scope.state) { var state = $scope.state; } else { var state = null; }
            if ($scope.zipcode) { var zipcode = $scope.zipcode; } else { var zipcode = null; }
            if ($scope.price) { var price = $scope.price; } else { var price = null; }
            if ($scope.bedrooms) { var bedrooms = $scope.bedrooms; } else { var bedrooms = null; }
            if ($scope.description) { var description = $scope.description; } else { var description = null; }
            if ($scope.image_url) { var image_url = $scope.image_url; } else { var image_url = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcA1AMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAEHAgj/xAA/EAACAQIEBQIDBQUGBgMAAAABAgMEEQAFEiEGEzFBUSJhFDJxFSOBkaFCUrHB0QcWJDPh8CVTYnKC8UOisv/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAAEEBQb/xAAtEQACAgEDAgQFBAMAAAAAAAAAAQIRAxIhMQRBIjJxgRMUM1FhBSNC8ENSkf/aAAwDAQACEQMRAD8AAjriWKN5XCxqWbwBjwBgllUpgLyJLGrC1ldCdX/kOmO/klpjZxscdUqLUXD2cGISjLZ2jPQhb3/Ab4N8Nx01PVRtUxyJMh3VhYhvcHFzKa7PLoIqymp4juIGi12/8r3/ACGMzziAo4TP8tiAsAlZTMSEPv3Axy/nVk2Z0n0Lx7oclnXQCh2tjcrJVU0kE1zHIpVgGIJB67jcYU8qzynqXWmWcSOfkbprGGCIlfmOFuCLt9xJoP7K0ps/iqVrwMsp5RLTwoLSoytqQliCGsdt+oAve27PxFwnR1dNV1NBSRw5k0MyrLGxQuXUghiNyLm/1AwbhkuMWeahXc4XoS4Ds+eIYMxoaur+zKmqny16FYXrHjCt6AdIQ+zC3nfENHPC2TTVFZD8KkjSAxv2DdfHe5/PHYM04foqfKqtMvjZXlnkqCdRsrO2ph9OuOY8XRQx0DSzkXiYFGA2Ivbp/PGvCqg5IyZnc1FitR1pyqlSlWBZ45l1LJG3qIPUkdt9t/GGajnjqqdJY2DBh1HfC5nGVrKI3y3aGUWRVOozA2J67e+L2Q5dLE0VUrGOLl6eVckFuha3bpg+nyTjPRygM0IOOruHLW7YowUyUYqppHBMrF2bTuB498ELXxhUEWIx0JQTd/YxRlWwozZXWzZkkAeVIHU/eXFtHS2noPYYZ4olijSNBZUFhie2+NWwvFgWNtruMyZnkpPsR2wNAc5lJTQxhYNOqQ6f2j3H6DBbTjABe9t8HPHqoCM9NgiLJIoGHKc25vMYML33vb6d/OCqqGYA9D3xapKKSrZhGVAXdixtbBTL6Sio59daRLoN1XcdN8BGEcSekO5ZHchbzvLaRYjXz0zsUUbhbW32H1wqZlXVeZSSLTyMlO6hWiVt7C59XgXP8MdF4h4ugdvho4lREADIg2N8c4z2pFc4kiiCSWtBEqjdehYj37YwdS74pfdG3AtyfLKidsumjpXelpYZAzJpUGUfu+WY7Dx9MCsxgld5pKk/DvqsitYAgWAUKDt1G+LtWa13go46eSOFQFYqGTX3brYD8cXKDhmWcK9VUJ8OWL6Y/UXv31YSscp+GO415Iw8UhYhhWWRuZzZSp06YRq9hv4vtg5k3Dc1TvmcTwxLuOzMb9P0/XDdSUVPRQCGmhCIOvk+5PfF2mpJqqVVp4yxYgX6C+NmPolGpTZmn1bltBAyatpaNhE2kHSD1H8/pjMAeJ6KtyTNpKWSOrd2HNZkAZTqv0NsZhcuqp0kWultXYyjFzLJOVWR3dlViFYrIyWB9x/D/wB4rKuJ6NX+Mg5YBbmC1+l7jHQyrwMyY29aOi5FCJa1dCHSG1CwGw38kecCOM9qmRUUg3tbTf8ATBfL6dRNT8mslR2BLGNFYXtfxcD8cC+J4ZFcysFqGWTddPz+9ibHHllwkem1eKT/AAI2UtPT5vHTxVjUsDnmKok9NwbW/THWaarirFPKmWQxgayrr189ccv0U0larfY02ZxFB92psUN+pvh0/s+FPEa0RZU2WmQRgieT/NNj0/j+OHxlK9nsImoVutxpjkaOMs/pT94sv9ceZGcqNMy7773xLXSFaRgEuSQLC3kYQuIsjzHMc2fM4M5my7LqKlT4lYncEr6ySoXa9sW8klKgVCDjY2V71RhKQWBI+YMDb8Mcu4p4desnV5nnp5la3MKHSwJ39u+D3C9az5tTcri6OthKPrppFXmN6DsDt0O/TouHpkZg7HQVsxUlLX3YWutvbD4Z24tSVoTPDHVcW7OO5XlK5VTmmE7T6XPqYdN7bYuFL9sM3EGY5JQVEEOaworVIdllRD2IHUb9x2OIIcoy/M11ZPmCSNb5HYG35bj8sa8PX4UlHgyZv0/Ndp2L1sbtgpV5PWUiymohNkX5l3HUYHhdsdGM4yVxdnOlCUXUlRHpxlsS6catgwLI7Y1bEtsb04hZENgTewtvgNX8ToHusMk4A9R1C6+xH5YPW+o+mA1Bw9FBWGpnmapY/wDMUW1Xvew6npjPmWVtKA/E8dPWB66vFVVRViUQYxjSgdbl2NgemxABODFBlRSsNTUxJrK31KTvc9NJ8C36eMHYKItf4envpFiUToMEIctTmrFWzNGzdI4l1MvufGEOGPG9WVj1KeVaccdhMjyeorKt5M0d2SOT7jlyWJF+4GOg8P8ADccoM2ZFV29ER7e5/piEZMlEjVFQ/ORT6Xh+X8e4x7qs2TSTTkszCzFuw9sEqlGsb9ynad5P+Ek+VZTT1Wt6ouFP+UosCff2xcNaslo8uotSg/OFsowFizGOIi1Om3c7m+I5c3qSrRwyFEP7uxOC+FJ8lfFiuBgAc7zTxK/cMQMawosxY3ZmJ8k4zE+XRXzDKoXFikVDUxcwkKGBNjbHkLi3QK3xcOgKWDgjV0vh2X6cvQTi869R+y6BPiKa2XjSoa+pFaw022F8AOK4qaQSIRNCTJYLpO/q/L3632wyRrMCp+K1Wja55W3T2tgPxKJw7qYopmL9l6i/gm3648uuI+p6V/z9BLNRHEKX43OJMtJQaZ4//lHW3Tthy/s/qIJPtArm8uZWEYu2ocrY7f78YU6VK11jGWUVLWWReZFVE/d7bEX/AB/TDRweKuI1a5pQUuX6ioQU8eoP6TuSvTt18nDo8ip8L2GCuDojuakCPVsGVR+0thci/n88VEeoC5slKImc08eky/Lqs9r+2CVdFpiLJZvYkgbkb9PGAtWiMmcmanmqIhSqHijHzjQ1wPc3wvI/H7B460C/kCZlHnlNLXZJlsSxrITWQtvEOXa9iL73A7/OcO9VeWJtkuLltJUkj1Ai+x/THOeERk0XElH8NRZvSyqshWOqVhEfuze9zb94j3tbHSaxYZFeQoV0KTqYHbrv6hb9cOXDES8yAeY0MUuX1NQ0VK1TBEWhkqhdY2v1J7AdfwwF4YhqI80E8mWZbE5hI+OhcaSPT6SPJ/rg9mcZmymtRKRa29MQKckAyG/S56D9MLPCtHF9qFUySto5+USQZSYrXW5vfr9OxwnCPzcjtIXaMCWDlHb1IxKMPA7YRI6ygzN40qaWTL6qR+WCRZWfwOx7YdqKmWEkaTECFsp2BtvsNrfkMJOd15j4qqkXOJ43NUo5FTBeLtsh7MOt/cYJTlDN4XQGmMsKUlZqryyalVzIAVBFnU3BxT0YZpq2ofK6iQ03PmRAQoX1P7EDvYdbYr0OW01c6uTNBqBvC6WII6i/jHVxfqCVrL27nMyfp7klLF37AEJjem2GCp4fZFLwS39mG+Kgokp2AmIaTb0+L+TjQuuwSjqi7EPoc0ZaZKgdDSSTH0g27+MF48vpEy+KSWJpJAzXKbXG36b48TB6igcrLKlLA3NmihFjKQBttuF/jgXTZxJmUGvlTUtOWYKjAqzC3W/UfTHPy9VlySqLo34umxY43JWH6bMI4ahaaEleYNGiHql7fr9Tieky+nd2nJMDq2jUQbNe3zeDfC/SG2Y0q7oOdsqj5un+98NFEvLjkA+8AmUd1xhyxcGne5twz1pqtiKoWagIY8xr+kaFuG379vzxQq6Cjq2YqPhKgbsLHT9SO31G2M4vZ4xTlJGb/iNLqTcAC4/DHnNaxVzhqY1sN+UGSlkSzA/vK3v4B7YLps0/NF0ydTihSjJWgHPC0MzxPpJQ2JU3B+mI7bYKVEUc0qLe00o1KLj1fj0/O31OKMkTROyMCCp3BFsehw5o5F+Tz+bDLG/wQ2xmJLYzDhBhiKkgjcYnplVZkaQkKO4Nj0wSr4J5JNcsJXtsMQU8LCZWVQTY/MbC1iDjPOd4n6GjHGsq9UOeXilDKppFU6DpJpzf8LbjAfiJYGksskiHmbLuRf8A7W2xeWKV3jDPGfuzYabdSvm+KXFRqOSoKqbyi+nuL9LHsR3v+GPNx4geifMxArjlqNAM5Stb7teW9Gp6af2rm/j9cNP9nn2fKlccoSrki5oExrIwWB0GwX1YA0b5l6GyiuoqV+QnNWrAAclD8tx9fHUYbOD/ALQdKs5xWUlTKJPQaNUIUaRe589sOg9xWTgZZzIYJBMhS0m2jXuL7XtgNVzLGudh640RFPGRLYWj+7Pq38dfGDkysIiQVUg7koel+nXrgZUrUyQZ0KWKCoblqFgdrcxuULL06HpheTz+wWL6fuKPC0tTNmkfxHE1JX03LcPFDHGsjekWAIPm3bopx0Y6jTzct7qEb9k79fBOOdcLLPTZ4lRNwrBQyoj/AOLilQ6NgLbDqb/rh3fMIp9aPCzswYfKjfv99vGHLysS/Mgbm6p9jV71AqTD8MQwpvnO/b3wu8Dz0UmbNBT5nms/3RJoqxbaRceq5FtvGGfMpFgyusb4w0VoLrOVBEe/zecBeEJ6iozVY6jP8vrqflHSsKqk2r022ve39BhGHg0ZuR1MYVF5cqul7WPUbe236DHPM3rtPFVRCM6jGmoS9NVQelRZdlPn39xjob0+h9ZZZBqtcixXbtt/PHOM6rJv7zTRfbGXOEqIz8NVRaTGLLuG7t4/DFt/vMFfRQw5lypsnrooaZmcRN/lOFZtul+x98CshDLEqFZ4mDMqJUMHCDY+hh1XrgvnSrLlNYrQxSl6c/M/LDjwx2t9f1wD4ajeIRhYEhiZn+Sbmo2wsVPYfzviSdaiQV6f73DWa1z0stNGpuJJwrDuBpJt+mFejqklzCsadaUSPUH0wkuAbKLs371sMGbF5KzLlZjIFqx3t+ycAaOWGOrzKIyK+mrKrohKCPvbyT5OBwbIPqbbVh5JpDwtmTUs8cEiynlzSi6jZOo+uEXKq5YKWXmVhr57kvMuyjptfxhwy9ebwnmaCmWsHOccjV840rt+WFLJlENKHrKOKgQXKQqwBC+56327YevMZ5eUvUk88mZU4kUrGahNhsGH06thxpmZElAm5bCVblnIuN9t/wCBwj0lUqViiJms9RHqtsDfcbnc/ph3opOYk4N/nW45lieve2/0wOfsF0+1+hS42J+HX0aUWqp2EgJ9R19PH/vFfNUYcUU7nKknUwlfi7/Jsbqb9dumJONgRRyScxmHMgPLI2FnO/jv+mKnELiPiCmK5kYJDAR8KSQJutj487e2FdL3HdVwvc95lGzIslNCs1TGVZIZCbNv37j6m+LGbwoYucImWXUqs97rJcE36drDFHNtD5LMa5JGVYhzEha8g9X7N97/AI3wWqApiAKyL8npf5V+YfnjpY5OOaJz5xUsMgFo9sbwWikREsKeJvduuMx2FPbg5Dx78nktJa/NJ9jjyzLyWViUuD6gem3T8cWHpZI/mUfgwONCF9QAUAk9za2MuRr4cvQ0Y7+JH1C0PLNVCYGmitGbhQyXOtLE367X/P6YpcUSJ8OpppSzCVbqXLW362O4tgzQQyTVKgtAhCWsX3PqU+PYD8cLPFtcAuh0jdFkGqz3ZT5Km23vjzmqowPQy80xUq6emljpzmWRT5n/AIdSrU7NeH0dD/v9nDTwZTUi5RmEdJls2WwtKdcE4u8noG4ub7bYWYKnQycviRcmdkAvLtzvTbv4Nx+OHXhYVM9DVtHnSZ3aUgSqFIj9Isv17/iMPxO9xGQKpDEkkkkYLn1bFLAevr1OKGYiI0+fvVmp+FESq5hvdRyhcrbvY3wUWN9TuY1TcjWqL11Ha4wKqHqQc7WnqIYbhbSSbqGESjceNsBkf7nsHi+n7inwlLlcudiDL85ziWYxuUpaoyaWG1zuO2/5DDzy6pbrIzaVuSWANh69/UPphbyt85hzNjNVZTUU+g7wx6ZGPp8HDeolM9VGG+7jgDByG9V9Wx3O243w9PwsQ14kUaxpmy2rjgEDs0Gwn+Rjfow8G+APDtHWLmmqpyWho1MTA19O433X02t0Pn2PTB3MUE2U1sclKtWrRWMFwGkF+gvhb4Mp6CLiEGDKq+lm5Lemdrw2uvTe2rpa3nGfBwjTn5Y8xQtBGCWV1Lel0YEdPr0wgZ1I8vElQhqMomRKhCsUwAljsF392B6fQY6PUKEWMBHj9Vha5B26dwMc6zmGWTiKpkWjyedROjay4WYWVRc+4tb8BiP6wMfpBqtqkqsnrNUMQCwMrPPYRv6f2rW28m2A/CzxaF5UNEhJf10UmpXFupHbxbtbti45H2XmQLoqiB7mYehdurL3H4YGcKTRMl4paBwXexpEKA+kdffyPpiS/l/exIfx/vcL54Q1Xlh9O1UoPW3Q9f8ATARI5JMxzFnep9FSdJnUCw22QePfB7PC/Ny/UZf89bEDfv564SczlanzPMVZZUmacnW0+osD3Hgb9MTD3Cz9gzR5n/wDM4nneKETjVLEpLKDoW6kd/f64UcmkoxExpJqmrBZ9U021zpHc/0wcyFZ/smvELxRTc5NOpvTcug9QwPy8V4LisalSYMwVaYgaBp6X63+mNHdGVSbuyejWoasRljEcYnhOq1iwtv6mP8A+bY6DSvbnmGQRk6bESA/qeuOfU1MzVKM7liJImJ0E9B5YjDtSwpLTypMGKtHG/oZQw79/rhebsNw9/Qh44ZzldR92Ag5REgHU6+njbb88Vs6NQOIctaLLo5laMr8WxtyTvsfY+PfFjjQD7Kq25hu0Sfd2NhZ+vi++BuftGueZQ7ZhLBJoNqYMwFT+Xg2/PCum7juq4RbzgTRUExSVaWRRtMR6I9+pHS2LxYPTXWcyLy0YDzufVttvinWgz5dVMqam5bXhO6yf9JI23+mL0Ot4lV+UG5QJRN97jpt0xvTrJEwf45ehWKnGsWeXjMdVzZylFB9F4elhEqzwqx/Z+JAI3t5OA2dyUUFVSx0E3MhlTW8iTIxQ6hYX+l/fbCbmeYZkC1PSLpjg0X6Es+xIuLEi9uvS1sXo66rczVGZlP8LQuIAzLfUBtt337Wx5/5qVO5HdXTq01EcVzKHLo5J0leWONfWsdTcntYA7k/64S8/ljzBvioHl1rJYwSP6r2tcA7/nbqMTCsappoKupq6cS8pDpkiVVia4YaiDtZh47Yq50Sx5lTPQThm5Z5EgJbY7gD8r2H64zyScVT4Gze7vuDcvn0gO2WJWEiytJddNxb39vyx0PgzNQsFWyZZFTWl1BYJdXM2HqN+/8AQYRIEjNJPVJGqrGFR9EoB3YdRt/DDJktJW0yyRUk9EIZZS/OrZPboDe1tugPnBYslPcBxbT2GnNs3jpMsqWVWHK3u/ygkkC9vwwncM5jLmn2xFLGKpXhMj046PsAVB8nr+OPPGklbpnscvdA0TXgmU32k20336dtxYYSMorjSViz8+RXA5YkDEXJ8Ht1PjpgcyfxNQMJUqGpOTlmePUR5YKSaI7EnSqk9j2328YZstzVBJVGfkvG6mxVwzAeoKqjbfbzfpthVqOdUyGSqnljV0XQXluD0K9e/Q98Xci5rNKVy8vWAEGZEMjKTfcadu/Tt+GDjJvjuVVMbK4H7JqWlE8QEa3eG+qM3PjfbCzluZPT1Ukr55U1kKo4FNMuwa+xJtfa2CFTmcsWVsfh543MZG8jbWPjf6G/jCMk6lnkiLlnBYBRq36de/QflhOvQkosdkbbOrZZnEWZB0SQ8yN976Tq2PSwGE/PKdP7yzSyZXlkrNIrJNJU6ZGsqi+mxuRsLe3vgfkNVOKhzTVLRlI2ZrWAIB3tcdeuJ6nM446uqdsvRnmOp5mfQZBoVDdbHwDbvYYLDJyk5SKcksdDHXaaDKHgaWMSPE3LlVb6b36qR+ljgNw7I6lhJOkwMjHmCIIGbSP/ALdP0wAnzSepikKzSBQOjC+j87/y2xZos2kpqB30S6m1BdewBsMW8ttsqMqq+wczsmBaN3lkkHxKvZiBYb7C3bphIdUlznMnVY2Uz6i0ZsTfuw7HFv4uY7TuoNx6ddxbsf44rVNRRiV5JXujMPWi21b27/MbDbF4Jbl5Z6gtkxaPLK6FqdalJZbNCFBLL6dh+WAuQVVLS0siUFBUwRl2IWZtLNZb374YMmojLldbJDUmGFZVIkJAZQdxt5t1/HAakjrIXl+KzWOocs33qMFB2/UYdCVybKmo6ESU9XPLKhjpU/zIiDZpD2ufGHmherMEwiiRpgi6UeIWIB8fQYQInvOFkqDLZkvdmIFgOm3sfzx0fKcpo6jIp55czWCC4Bk0+lSG2v074rLLVSX3KwtRu/sUuMtTZRVgxWAp7mQX2OoenxgZnsk8eYZNNBl8dSVBPxDH1U5t2+v8sHOJqalq8hr5qDNqeqEdEbxRnqNQ9XX8MLXE2hJcpqGrHijgF5IVa3PU6dtj2/ngcCcLTG9Q1JKi3mWYf4aoFWXk5iuuuNA1vT2Nwb79cGsqCtBDoiCIYbeu/MHTrv8Aj9cIv2nJPM3IjSKPdgtlbT76u/TzhlyjMp4YhUSRNNTQxENLGvfbxsL9sPWVakzLp8LQx8keR+eNYT6riusFRJyBDytR062W9sZjd89jXcwPp5fYkymGWagp5HE8pdA13BYfXAHO+G87kFVWyRzyU8MRkYttZQOm/X9cR5rXUwkkhyymhRGtaYKQR56t5sb274q0slayXSeaXqNL20kEdLfpjhKG9ndyTUlpZfyrIM5p6R6moh5NO0AZVKamkJAtuenX2N8S55l9UMy1ZTlNfFTKipZv2DsCSSx2J8YJZYlJ8JHHX5U9RINyY6csPp7n3wS0ZeyHl5HVh7XXTRON7bHFqdcoVLHdUxLbIs8RXlehJ0aWfTJG4XU1rHSdjfa3se2H+SiSpjy2izSJm9X3sY9B2ifpbpvbpgRmmWy1AT7IyGaJ73YvAU1DrY+euPUGX8XO5kZaiDSw0Ks+wFrBbncCxOGKtSkkXGLUHG+QjScPcNrm9VAI6ghYo1UfEOTqbXqG562A/wBnASbgSFM4legqJYqVZU00rJrZAy73Y7k6vyvgq8XEyZlUvSaEE6oDJUuHUMpuP2h5NvBxcyygzkTvJm09BOD8pgblsOvU6zfcjDss9UaoTjw1NNuzxDwflM8VQa2V1mji+71D1dG7ntjwnCmR8meOCpmaoikfU0bhUBG1iLdPa+JM3pcxr5SDy+VuAXrxe/a2/TrtgQMhzoSszZtSRIxDaEqDa/cjc7HfrgMM1GO8S82NSk2pUMNXRibL4Iy7gAuCBZhYN06bbeMAqjgelpq2nb7TqiHlYMOSuoKACLHz2384ItT5tNAYpc0pCrqVkAlkswNr9AdPT9m2Bg4UJ+JC11IizMrLYyyGMg36lbm9umF446W7XIzLU0qe6CeTZLBl1dWJHVSThI5JLyqptboNgLbEb4U5UzLMeIqyhqqyuFJIW5Sqx9Kht9AIIA2PbtbB7Jcoqstlilmq6qSOM7xPHFpYdN/VfGcZ5kJTA8FZRtJHdFjYMmnubnfwBa2DjBrI2lsym18JRs9x8KZfTQtEcyjmRyiCR6YoQxPiw2t1/wBMan4Yqqanbn1mXy0qnSxWUEhRexAv9NtuvtheV6mSILSU+V0zAi6pPI4lJ66iV29gB5xDBR1cswWSfLIQAdRSRwR5PqjtffrgvgRYtSoq5tTfZ+YzUzQMyxuqoZYyQUsLt0sLXOBmfiVYMsMRSVGVyyixA9QsAO1hh1h4Zr4VibKM0dZJkJd5Fsjf9liNt8Tn+z3OquEPKKczt8ssaEAg9b3JJPTvgoxiiPgh4LpEzfhjMI5g9kqF1ADSbaGF728d/ODn2TlEfDkZloOckc5EY12Pyi5LAC4t5x74f4Fr8nqkqnSWeRCCBFMI7He432K79DhkqrwiGPMMt0iVwqcx0cXO2/gbDBVFKkVFfc5a2Qo9Q6ZbTx216UGk6rX2O/Xa3T3x1qmyiCk4eejNGKhCqhoCzFTv2BO3nAOfMqWla8dCsBFtEsKxsRf8dvfbvis3Fagxuar0swUs0qgr7kDoMBofKC2+5Ln0GU5fSVsIp1y6omoJIU1BtMnqUgA9OuAlbC32BSVr061CszRaE3Kem4JvbYgDBObiShmdg9XTPZVZGdAyte+w9xbe4HbGDNcjkjjkqM4ypCBfQ1GSUNsX4r4JSqrFh+F80CfH0UR5E5YwxKR6ha9iCf4495ZCGyisMj2qGp2CwJb1DYhbEgA7dTg/LnnDaEF8+pdv+VlhP8sBs24iyCaNVXMGqlVrlXyywt0JFza/5YrR+AbQqT8PZtO4khoatVYD526/T2xrBlOJMjA0ulTZdl0UcYGnttfbGsNUV/qDuSx8Y3H3VY6/RCP5Y2eMXO5zKq2+uN4zF6V9i7ZDJxiBuamtcf8ASf6nEJ4xDnZath/1y/64zGYukSzzLxYpFhTyE99UmIhxPKDcU8Vvck43jMWkirPR4srSfuKeIHyRf+eIn4mzR1OvQPFgLYzGYpLcvsVnzvNy+tZ1A8ALb+GJIuJs0jHqED26altb8sbxmC0oG2afi3M3UppgU/vKm/64jXiKd7JOzP3NmI/qMZjMTSiKTZMnEskKsselVO+6K1vxIviP+8UscsckYiBjYOpMYNm89P0xmMxdIhteLamNiyxwBjuWEIve9/PnA+TOXd9bogJ7qoH8BjMZi9KIT/3uzVECJW1CqLAAPsLdMZJxpxAwt9sVg9ua2NYzE0olspTcR5xNfmZrWkHqOe39cQPmldIpWSqmdT1DOTfGYzEpFWyDnyn9o4zmyfvnG8ZgiJkZby36Y8mS37bYzGYhDyZiOjN9L40Z28fnjMZiyjPiGHbGYzGYso//2Q=='; }

            $scope.rentals.$add({
                title: title,
                email: email,
                phone: phone,
                street_address: street_address,
                city: city,
                state: state,
                zipcode: zipcode,
                bedrooms: bedrooms,
                price: price,
                description: description,
                image_url: image_url,
                date: Firebase.ServerValue.TIMESTAMP
            }).then(function(ref) {
                var id = ref.key();
                console.log('Added Record with' + id);
                $scope.msg = "Your Rental has Added to the list";
                clearFields();
            });

        }
        $scope.removeRental=function(rental,id){

           var ref= new Firebase('https://rent-186c6.firebaseio.com/rentals/'+id);
           ref.remove();
           $scope.msg="Rental Removed";
           $location.path('/#rentals');
        }

        function clearFields() {
            console.log("Clearing all Fields");
            $scope.title = "";
            $scope.phone = "";
            $scope.email = "";
            $scope.bedrooms = "";
            $scope.price = "";
            $scope.description = "";
            $scope.street_address = "";
            $scope.zipcode = "";
            $scope.city = "";
            $scope.image_url = "";
            $scope.state = "";

        }
        $scope.refresh = function(){
    refresh();
  }
        function refresh(){

        var ref = new Firebase('https://rent-186c6.firebaseio.com/rentals');
        $scope.rentals =$firebaseArray(ref);
        $scope.showLatest=true;
        $scope.showResults=false;
      }
    }])

    .controller('DetailsCtrl', ['$scope','$firebaseObject','$routeParams',function($scope,$firebaseObject,$routeParams) {
        // Get Id From Url

        $scope.id=$routeParams.id;
        // Get Db instance access
        var ref= new Firebase('https://rent-186c6.firebaseio.com/rentals/'+ $scope.id);
        // Get rental data

        var rentalData= $firebaseObject(ref);
        // Binding Data To Scope

        rentalData.$bindTo($scope,"data");
    }])
    .controller('EditCtrl', ['$scope','$routeParams','$firebaseObject',function($scope,$routeParams,$firebaseObject) {
          $scope.id=$routeParams.id;
        // Get Db instance access
        var ref= new Firebase('https://rent-186c6.firebaseio.com/rentals/'+ $scope.id);
        // Get rental data

        var rentalData= $firebaseObject(ref);
        // Binding Data To Scope

        rentalData.$bindTo($scope,"data");


        $scope.editRental=function(rental,id){
          var ref=new Firebase('https://rent-186c6.firebaseio.com/rentals/'+ id);
          $scope.msg="Rental Updatedss";
        }
    }])