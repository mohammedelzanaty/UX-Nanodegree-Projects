import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books : []
  }

componentDidMount() {
    BooksAPI.getAll()
    .then(books => {
      console.log(books)
      this.setState(() => ({
        books
      }))
    })
  }
  // export const update = (book, shelf) =>
  // fetch(`${api}/books/${book.id}`, {
  //   method: 'PUT',
  //   headers: {
  //     ...headers,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ shelf })
  // }).then(res => res.json())

  shelfChanger = (book, toShelf) => {
    console.log(book.shelf, book, toShelf)
    //BooksAPI.update(book, toShelf)
    //return (toShelf === 'none' || currentShelf === toShelf) ? null : BooksAPI.update(book, toShelf)
  }
  // if (toShelf !== 'none' && book.shelf !== toShelf) { 
  //   // this.setState((prevState) => {
  //   //   return {
  //   //     books: prevState
  //   //   }
  //   // })
  //   //.books.map((b) => (b === book) ? (b.shelf = book.shelf) : null)
  //   BooksAPI.update(book, toShelf)
  // }

    // shelfChanger = (toShelf, book, currentShelf) => {
  //   console.log(toShelf, book, currentShelf, this.state[currentShelf], this.state[toShelf])
  //     this.setState(() => (toShelf === currentShelf || toShelf === 'None') ? null : {
  //     [currentShelf]: this.state[currentShelf].filter(b => b !== book),
  //     [toShelf]: [...this.state[toShelf], book]
  //   })
  // }


  render() {
    return (
      <div className="app">
          <Route exact path='/search' render={() => (
            <SearchBooks allBooks={this.state.books} />
          )} />
          
          <Route exact path='/' render={() => (
                      <div className="list-books">
                      <div className="list-books-title">
                        <h1>MyReads</h1>
                      </div>
                      <div className="list-books-content">
                        <div>
                          <BookShelf shelfChanger={this.shelfChanger} title={'Currently Reading'} books={this.state.books.filter(book => book.shelf === "currentlyReading")}/>
                          <BookShelf shelfChanger={this.shelfChanger} title={'Want to Read'} books={this.state.books.filter(book => book.shelf === "wantToRead")}/>
                          <BookShelf shelfChanger={this.shelfChanger} title={'Read'} books={this.state.books.filter(book => book.shelf === "read")}/>
                        </div>
                      </div>
                      <div className="open-search">
                        <Link className='button' to='/search'><button>Add a book</button></Link>
                      </div>
                    </div>
          )} />

      </div>
    )
  }
}

export default BooksApp



                {/*
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">To Kill a Mockingbird</div>
                          <div className="book-authors">Harper Lee</div>
                        </div>
                      </li>
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">Ender's Game</div>
                          <div className="book-authors">Orson Scott Card</div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">1776</div>
                          <div className="book-authors">David McCullough</div>
                        </div>
                      </li>
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' }}></div>
                          <div className="book-title">Harry Potter and the Sorcerer's Stone</div>
                          <div className="book-authors">J.K. Rowling</div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">The Hobbit</div>
                          <div className="book-authors">J.R.R. Tolkien</div>
                        </div>
                      </li>
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">Oh, the Places You'll Go!</div>
                          <div className="book-authors">Seuss</div>
                        </div>
                      </li>
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">The Adventures of Tom Sawyer</div>
                          <div className="book-authors">Mark Twain</div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div> */}
              //   render() {
              //     return (
              //       <div className="app">
              //         {this.state.showSearchPage ? (
              //           <SearchBooks />
              //         ) : (
              //           <div className="list-books">
              //             <div className="list-books-title">
              //               <h1>MyReads</h1>
              //             </div>
              //             <div className="list-books-content">
              //               <div>
              //                 <BookShelf shelfChanger={this.shelfChanger} title={'Currently Reading'} books={this.state["Currently Reading"]}/>
              //                 <BookShelf shelfChanger={this.shelfChanger} title={'Want to Read'} books={this.state["Want to Read"]}/>
              //                 <BookShelf shelfChanger={this.shelfChanger} title={'Read'} books={this.state.Read}/>
              //               </div>
              //             </div>
              //             <div className="open-search">
              //               <Link className='button' to='/search'><button>Add a book</button></Link>
              //             </div>
              //           </div>
              //         )}
              //       </div>
              //     )
              //   }
              // }
              
              // export default BooksApp
            //     "books": [
            //         {
            //             "title": "The Linux Command Line",
            //             "subtitle": "A Complete Introduction",
            //             "authors": [
            //                 "William E. Shotts, Jr."
            //             ],
            //             "publisher": "No Starch Press",
            //             "publishedDate": "2012",
            //             "description": "You've experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell. Along the way you'll learn the timeless skills handed down by generations of gray-bearded, mouse-shunning gurus: file navigation, environment configuration, command chaining, pattern matching with regular expressions, and more. In addition to that practical knowledge, author William Shotts reveals the philosophy behind these tools and the rich heritage that your desktop Linux machine has inherited from Unix supercomputers of yore. As you make your way through the book's short, easily-digestible chapters, you'll learn how to: * Create and delete files, directories, and symlinks * Administer your system, including networking, package installation, and process management * Use standard input and output, redirection, and pipelines * Edit files with Vi, the world’s most popular text editor * Write shell scripts to automate common or boring tasks * Slice and dice text files with cut, paste, grep, patch, and sed Once you overcome your initial \"shell shock,\" you'll find that the command line is a natural and expressive way to communicate with your computer. Just don't be surprised if your mouse starts to gather dust. A featured resource in the Linux Foundation's \"Evolution of a SysAdmin\"",
            //             "industryIdentifiers": [
            //                 {
            //                     "type": "ISBN_13",
            //                     "identifier": "9781593273897"
            //                 },
            //                 {
            //                     "type": "ISBN_10",
            //                     "identifier": "1593273894"
            //                 }
            //             ],
            //             "readingModes": {
            //                 "text": true,
            //                 "image": false
            //             },
            //             "pageCount": 480,
            //             "printType": "BOOK",
            //             "categories": [
            //                 "COMPUTERS"
            //             ],
            //             "averageRating": 4,
            //             "ratingsCount": 2,
            //             "maturityRating": "NOT_MATURE",
            //             "allowAnonLogging": true,
            //             "contentVersion": "1.2.2.0.preview.2",
            //             "panelizationSummary": {
            //                 "containsEpubBubbles": false,
            //                 "containsImageBubbles": false
            //             },
            //             "imageLinks": {
            //                 "smallThumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            //                 "thumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            //             },
            //             "language": "en",
            //             "previewLink": "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api",
            //             "infoLink": "https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api",
            //             "canonicalVolumeLink": "https://market.android.com/details?id=book-nggnmAEACAAJ",
            //             "id": "nggnmAEACAAJ",
            //             "shelf": "currentlyReading"
            //         },
            //         {
            //             "title": "Learning Web Development with React and Bootstrap",
            //             "authors": [
            //                 "Harmeet Singh",
            //                 "Mehul Bhatt"
            //             ],
            //             "publishedDate": "2016-12-30",
            //             "description": "Build real-time responsive web apps using React and BootstrapAbout This Book* Showcase the power of React-Bootstrap through real-world examples* Explore the benefits of integrating React with various frameworks and APIs* See the benefits of using the latest frameworks to make your web development experience enchantingWho This Book Is ForThis book is for anybody who is interested in modern web development and has intermediate knowledge of HTML, CSS, and JavaScript. Basic knowledge of any JavaScript MVC framework would also be helpful.What You Will Learn* See how to integrate React-Bootstrap with React* Explore the Redux architecture and understand its benefits* Build a custom responsive theme* Easily interact with DOM on your web browser* Appreciate the advantages of using JSX* Get acquainted with the various routing methods in React* Integrate external APIs into ReactIn DetailReact-Bootstrap is one of the most popular front-end frameworks, and integrating it with React allows web developers to write much cleaner code. This book will help you gain a thorough understanding of the React-Bootstrap framework and show you how to build impressive web apps.In this book, you will get an overview of the features of React-Bootstrap and ReactJS, along with the integration of ReactJS components with ReactJS. You will understand the benefits of using JSX and the Redux architecture. The server-side rendering of React will also be shown. All the concepts are explained by developing real-world examples.By the end of this book, you will be equipped to create responsive web applications using React-Bootstrap with ReactJS, and will have an insight into the best practices.",
            //             "industryIdentifiers": [
            //                 {
            //                     "type": "ISBN_10",
            //                     "identifier": "1786462494"
            //                 },
            //                 {
            //                     "type": "ISBN_13",
            //                     "identifier": "9781786462497"
            //                 }
            //             ],
            //             "readingModes": {
            //                 "text": false,
            //                 "image": false
            //             },
            //             "pageCount": 278,
            //             "printType": "BOOK",
            //             "maturityRating": "NOT_MATURE",
            //             "allowAnonLogging": false,
            //             "contentVersion": "preview-1.0.0",
            //             "panelizationSummary": {
            //                 "containsEpubBubbles": false,
            //                 "containsImageBubbles": false
            //             },
            //             "imageLinks": {
            //                 "smallThumbnail": "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            //                 "thumbnail": "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            //             },
            //             "language": "en",
            //                             http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api
            //             "previewLink": "http://books.google.com/books?id=sJf1vQAACAAJ&dq=redux+react&hl=&cd=6&source=gbs_api",
            //             "infoLink": "http://books.google.com/books?id=sJf1vQAACAAJ&dq=redux+react&hl=&source=gbs_api",
            //             "canonicalVolumeLink": "https://books.google.com/books/about/Learning_Web_Development_with_React_and.html?hl=&id=sJf1vQAACAAJ",
            //             "id": "sJf1vQAACAAJ",
            //             "shelf": "currentlyReading"
            //         },
            //         {
            //             "title": "The Cuckoo's Calling",
            //             "authors": [
            //                 "Robert Galbraith"
            //             ],
            //             "publisher": "Mulholland Books",
            //             "publishedDate": "2013-04-30",
            //             "description": "A brilliant debut mystery in a classic vein: Detective Cormoran Strike investigates a supermodel's suicide. After losing his leg to a land mine in Afghanistan, Cormoran Strike is barely scraping by as a private investigator. Strike is down to one client, and creditors are calling. He has also just broken up with his longtime girlfriend and is living in his office. Then John Bristow walks through his door with an amazing story: His sister, thelegendary supermodel Lula Landry, known to her friends as the Cuckoo, famously fell to her death a few months earlier. The police ruled it a suicide, but John refuses to believe that. The case plunges Strike into the world of multimillionaire beauties, rock-star boyfriends, and desperate designers, and it introduces him to every variety of pleasure, enticement, seduction, and delusion known to man. You may think you know detectives, but you've never met one quite like Strike. You may think you know about the wealthy and famous, but you've never seen them under an investigation like this. Introducing Cormoran Strike, this is the acclaimed first crime novel by J.K. Rowling, writing under the pseudonym Robert Galbraith.",
            //             "industryIdentifiers": [
            //                 {
            //                     "type": "ISBN_13",
            //                     "identifier": "9780316206860"
            //                 },
            //                 {
            //                     "type": "ISBN_10",
            //                     "identifier": "0316206865"
            //                 }
            //             ],
            //             "readingModes": {
            //                 "text": true,
            //                 "image": false
            //             },
            //             "pageCount": 464,
            //             "printType": "BOOK",
            //             "categories": [
            //                 "Fiction"
            //             ],
            //             "averageRating": 3.5,
            //             "ratingsCount": 3037,
            //             "maturityRating": "NOT_MATURE",
            //             "allowAnonLogging": true,
            //             "contentVersion": "1.21.20.0.preview.2",
            //             "panelizationSummary": {
            //                 "containsEpubBubbles": false,
            //                 "containsImageBubbles": false
            //             },
            //             "imageLinks": {
                            //http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api
            //                 "smallThumbnail": "http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            //                 "thumbnail": "http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            //             },
            //             "language": "en",
            //             "previewLink": "http://books.google.com/books?id=evuwdDLfAyYC&printsec=frontcover&dq=rowling&hl=&cd=4&source=gbs_api",
            //             "infoLink": "https://play.google.com/store/books/details?id=evuwdDLfAyYC&source=gbs_api",
            //             "canonicalVolumeLink": "https://market.android.com/details?id=book-evuwdDLfAyYC",
            //             "id": "evuwdDLfAyYC",
            //             "shelf": "wantToRead"
            //         },
            //         {
            //             "title": "Lords of Finance",
            //             "subtitle": "The Bankers Who Broke the World",
            //             "authors": [
            //                 "Liaquat Ahamed"
            //             ],
            //             "publisher": "Penguin",
            //             "publishedDate": "2009-01",
            //             "description": "Argues that the stock market crash of 1929 and subsequent Depression occurred as a result of poor decisions on the part of four central bankers who jointly attempted to reconstruct international finance by reinstating the gold standard.",
            //             "industryIdentifiers": [
            //                 {
            //                     "type": "ISBN_10",
            //                     "identifier": "159420182X"
            //                 },
            //                 {
            //                     "type": "ISBN_13",
            //                     "identifier": "9781594201820"
            //                 }
            //             ],
            //             "readingModes": {
            //                 "text": false,
            //                 "image": false
            //             },
            //             "pageCount": 564,
            //             "printType": "BOOK",
            //             "categories": [
            //                 "Business & Economics"
            //             ],
            //             "averageRating": 4.5,
            //             "ratingsCount": 14,
            //             "maturityRating": "NOT_MATURE",
            //             "allowAnonLogging": false,
            //             "contentVersion": "1.0.0.0.preview.0",
            //             "imageLinks": {
            //                 "smallThumbnail": "http://books.google.com/books/content?id=74XNzF_al3MC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            //                 "thumbnail": "http://books.google.com/books/content?id=74XNzF_al3MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            //             },
            //             "language": "en",
            //             "previewLink": "http://books.google.com/books?id=74XNzF_al3MC&printsec=frontcover&dq=finance&hl=&cd=1&source=gbs_api",
            //             "infoLink": "http://books.google.com/books?id=74XNzF_al3MC&dq=finance&hl=&source=gbs_api",
            //             "canonicalVolumeLink": "https://books.google.com/books/about/Lords_of_Finance.html?hl=&id=74XNzF_al3MC",
            //             "id": "74XNzF_al3MC",
            //             "shelf": "wantToRead"
            //         },
            //         {
            //             "title": "Needful Things",
            //             "authors": [
            //                 "Stephen King"
            //             ],
            //             "publisher": "Simon and Schuster",
            //             "publishedDate": "2016-05-03",
            //             "description": "Now available for the first time in a mass-market premium paperback edition—master storyteller Stephen King presents the classic #1 New York Times bestseller about a mysterious store than can sell you whatever you desire—but not without exacting a terrible price in return. “There are two prices for this. Half…and half. One half is cash. The other is a deed. Do you understand?” The town of Castle Rock, Maine has seen its fair share of oddities over the years, but nothing is a peculiar as the little curio shop that’s just opened for business. Its mysterious proprietor, Leland Gaunt, seems to have something for everyone out on display at Needful Things…interesting items that run the gamut from worthless to priceless. Nothing has a price tag in this place, but everything is certainly for sale. The heart’s desire for any resident of Castle Rock can easily be found among the curiosities…in exchange for a little money and—at the specific request of Leland Gaunt—a whole lot of menace against their fellow neighbors. Everyone in town seems willing to make a deal at Needful Things, but the devil is in the details. And no one takes heed of the little sign handing on the wall: Caveat emptor. In other words, let the buyer beware…",
            //             "industryIdentifiers": [
            //                 {
            //                     "type": "ISBN_13",
            //                     "identifier": "9781501143786"
            //                 },
            //                 {
            //                     "type": "ISBN_10",
            //                     "identifier": "1501143786"
            //                 }
            //             ],
            //             "readingModes": {
            //                 "text": false,
            //                 "image": false
            //             },
            //             "pageCount": 960,
            //             "printType": "BOOK",
            //             "categories": [
            //                 "Fiction"
            //             ],
            //             "averageRating": 3.5,
            //             "ratingsCount": 28,
            //             "maturityRating": "NOT_MATURE",
            //             "allowAnonLogging": false,
            //             "contentVersion": "1.3.1.0.preview.0",
            //             "imageLinks": {
            //                 "smallThumbnail": "http://books.google.com/books/content?id=jAUODAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            //                 "thumbnail": "http://books.google.com/books/content?id=jAUODAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            //             },
            //             "language": "en",
            //             "previewLink": "http://books.google.com/books?id=jAUODAAAQBAJ&printsec=frontcover&dq=king&hl=&cd=8&source=gbs_api",
            //             "infoLink": "http://books.google.com/books?id=jAUODAAAQBAJ&dq=king&hl=&source=gbs_api",
            //             "canonicalVolumeLink": "https://books.google.com/books/about/Needful_Things.html?hl=&id=jAUODAAAQBAJ",
            //             "id": "jAUODAAAQBAJ",
            //             "shelf": "read"
            //         },
            //         {
            //             "title": "React",
            //             "subtitle": "Die praktische Einführung in React, React Router und Redux",
            //             "authors": [
            //                 "Nils Hartmann",
            //                 "Oliver Zeigermann"
            //             ],
            //             "publisher": "dpunkt.verlag",
            //             "publishedDate": "2016-07-07",
            //             "description": "React ist ein JavaScript-Framework zur Entwicklung von Benutzeroberflächen sowohl im Browser als auch auf Mobilgeräten. Entwickelt und eingesetzt von Facebook ist es mittlerweile als Open-Source-Projekt verfügbar und hat sich bereits im Einsatz bei diversen namhaften Websites, wie z. B. Airbnb und Netflix, bewährt. Dieses Buch stellt Ihnen die Konzepte von React, React Router und Redux anhand eines durchgehenden Beispiels vor. Sie lernen, wie Sie mit React wiederverwendbare UI-Komponenten entwickeln und wie Sie auf Basis der einzelnen Komponenten ganze Anwendungen zusammenbauen. Unter anderem werden folgende Themen behandelt: - Entwickeln und Testen eigener React-Komponenten auf Basis des JavaScript-Standards ECMAScript 2015 (ES6) - Routing mit dem React Router - Das Architektur-Modell Flux und wie damit komplette Anwendungen umgesetzt werden (am Beispiel des Redux-Frameworks) - Serverseitiges Rendern von React-Komponenten und -Anwendungen - Anbindung eines REST-Backends Die im Buch eingesetzten Sprachfeatures aus ES6 werden in einem eigenen Kapitel vorgestellt, sodass zum Verständnis des Buches Kenntnisse von ES5 ausreichen. Nach der Lektüre des Buches werden Sie in der Lage sein, eigene Projekte mit React umzusetzen.",
            //             "industryIdentifiers": [
            //                 {
            //                     "type": "ISBN_13",
            //                     "identifier": "9783864919640"
            //                 },
            //                 {
            //                     "type": "ISBN_10",
            //                     "identifier": "3864919649"
            //                 }
            //             ],
            //             "readingModes": {
            //                 "text": true,
            //                 "image": false
            //             },
            //             "pageCount": 342,
            //             "printType": "BOOK",
            //             "categories": [
            //                 "Computers"
            //             ],
            //             "maturityRating": "NOT_MATURE",
            //             "allowAnonLogging": true,
            //             "contentVersion": "1.4.3.0.preview.2",
            //             "panelizationSummary": {
            //                 "containsEpubBubbles": false,
            //                 "containsImageBubbles": false
            //             },
            //             "imageLinks": {
            //                 "smallThumbnail": "http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            //                 "thumbnail": "http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            //             },
            //             "language": "de",
            //             "previewLink": "http://books.google.com/books?id=IOejDAAAQBAJ&dq=redux+react&hl=&cd=15&source=gbs_api",
            //             "infoLink": "http://books.google.com/books?id=IOejDAAAQBAJ&dq=redux+react&hl=&source=gbs_api",
            //             "canonicalVolumeLink": "https://books.google.com/books/about/React.html?hl=&id=IOejDAAAQBAJ",
            //             "id": "IOejDAAAQBAJ",
            //             "shelf": "read"
            //         },
            //         {
            //             "title": "Satire TV",
            //             "subtitle": "Politics and Comedy in the Post-Network Era",
            //             "authors": [
            //                 "Jonathan Gray",
            //                 "Jeffrey P. Jones",
            //                 "Ethan Thompson"
            //             ],
            //             "publisher": "NYU Press",
            //             "publishedDate": "2009-04-01",
            //             "description": "Satirical TV has become mandatory viewing for citizens wishing to make sense of the bizarre contemporary state of political life. Shifts in industry economics and audience tastes have re-made television comedy, once considered a wasteland of escapist humor, into what is arguably the most popular source of political critique. From fake news and pundit shows to animated sitcoms and mash-up videos, satire has become an important avenue for processing politics in informative and entertaining ways, and satire TV is now its own thriving, viable television genre. Satire TV examines what happens when comedy becomes political, and politics become funny. A series of original essays focus on a range of programs, from The Daily Show to South Park, Da Ali G Show to The Colbert Report, The Boondocks to Saturday Night Live, Lil’ Bush to Chappelle’s Show, along with Internet D.I.Y. satire and essays on British and Canadian satire. They all offer insights into what today’s class of satire tells us about the current state of politics, of television, of citizenship, all the while suggesting what satire adds to the political realm that news and documentaries cannot.",
            //             "industryIdentifiers": [
            //                 {
            //                     "type": "ISBN_10",
            //                     "identifier": "081473216X"
            //                 },
            //                 {
            //                     "type": "ISBN_13",
            //                     "identifier": "9780814732168"
            //                 }
            //             ],
            //             "readingModes": {
            //                 "text": true,
            //                 "image": false
            //             },
            //             "pageCount": 288,
            //             "printType": "BOOK",
            //             "categories": [
            //                 "Performing Arts"
            //             ],
            //             "maturityRating": "NOT_MATURE",
            //             "allowAnonLogging": true,
            //             "contentVersion": "0.6.4.0.preview.2",
            //             "panelizationSummary": {
            //                 "containsEpubBubbles": false,
            //                 "containsImageBubbles": false
            //             },
            //             "imageLinks": {
            //                 "smallThumbnail": "http://books.google.com/books/content?id=1wy49i-gQjIC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            //                 "thumbnail": "http://books.google.com/books/content?id=1wy49i-gQjIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            //             },
            //             "language": "en",
            //             "previewLink": "http://books.google.com/books?id=1wy49i-gQjIC&printsec=frontcover&dq=satire&hl=&cd=3&source=gbs_api",
            //             "infoLink": "https://play.google.com/store/books/details?id=1wy49i-gQjIC&source=gbs_api",
            //             "canonicalVolumeLink": "https://market.android.com/details?id=book-1wy49i-gQjIC",
            //             "id": "1wy49i-gQjIC",
            //             "shelf": "read"
            //         }
            //     ]
            // }=
                /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // "Currently Reading": [
    //   {
    //     bookTitle: 'To Kill a Mockingbird',
    //     bookAuthor: 'Harper Lee',
    //     bookCoverURL: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
    //   },
    //   {
    //     bookTitle: 'Ender\'s Game',
    //     bookAuthor: 'Orson Scott Card',
    //     bookCoverURL: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api'
    //   },
    // ],
    // "Want to Read": [
    //   {
    //     bookTitle: '1776',
    //     bookAuthor: 'David McCullough',
    //     bookCoverURL: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api'
    //   },
    //   {
    //     bookTitle: 'Harry Potter and the Sorcerer\'s Stone',
    //     bookAuthor: 'J.K. Rowling',
    //     bookCoverURL: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api'
    //   },
    // ],
    // "Read": [
    //   {
    //     bookTitle: 'The Hobbit',
    //     bookAuthor: 'J.R.R. Tolkien',
    //     bookCoverURL: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api'
    //   },
    //   {

    //     bookTitle: 'Oh, the Places You\'ll Go!',
    //     bookAuthor: 'Seuss',
    //     bookCoverURL: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api'
    //   },
    //   {
    //     bookTitle: 'The Adventures of Tom Sawyer',
    //     bookAuthor: 'Mark Twain',
    //     bookCoverURL: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api'
    //   }
    // ],
    //showSearchPage: false
    
  //   {
  //     "title": "The Linux Command Line",
  //     "subtitle": "A Complete Introduction",
  //     "authors": [
  //         "William E. Shotts, Jr."
  //     ],
  //     "publisher": "No Starch Press",
  //     "publishedDate": "2012",
  //     "description": "You've experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell. Along the way you'll learn the timeless skills handed down by generations of gray-bearded, mouse-shunning gurus: file navigation, environment configuration, command chaining, pattern matching with regular expressions, and more. In addition to that practical knowledge, author William Shotts reveals the philosophy behind these tools and the rich heritage that your desktop Linux machine has inherited from Unix supercomputers of yore. As you make your way through the book's short, easily-digestible chapters, you'll learn how to: * Create and delete files, directories, and symlinks * Administer your system, including networking, package installation, and process management * Use standard input and output, redirection, and pipelines * Edit files with Vi, the world’s most popular text editor * Write shell scripts to automate common or boring tasks * Slice and dice text files with cut, paste, grep, patch, and sed Once you overcome your initial \"shell shock,\" you'll find that the command line is a natural and expressive way to communicate with your computer. Just don't be surprised if your mouse starts to gather dust. A featured resource in the Linux Foundation's \"Evolution of a SysAdmin\"",
  //     "industryIdentifiers": [
  //         {
  //             "type": "ISBN_13",
  //             "identifier": "9781593273897"
  //         },
  //         {
  //             "type": "ISBN_10",
  //             "identifier": "1593273894"
  //         }
  //     ],
  //     "readingModes": {
  //         "text": true,
  //         "image": false
  //     },
  //     "pageCount": 480,
  //     "printType": "BOOK",
  //     "categories": [
  //         "COMPUTERS"
  //     ],
  //     "averageRating": 4,
  //     "ratingsCount": 2,
  //     "maturityRating": "NOT_MATURE",
  //     "allowAnonLogging": true,
  //     "contentVersion": "1.2.2.0.preview.2",
  //     "panelizationSummary": {
  //         "containsEpubBubbles": false,
  //         "containsImageBubbles": false
  //     },
  //     "imageLinks": {
  //         "smallThumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  //         "thumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  //     },
  //     "language": "en",
  //     "previewLink": "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api",
  //     "infoLink": "https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api",
  //     "canonicalVolumeLink": "https://market.android.com/details?id=book-nggnmAEACAAJ",
  //     "id": "nggnmAEACAAJ",
  //     "shelf": "currentlyReading"
  // },
  // {
  //     "title": "Learning Web Development with React and Bootstrap",
  //     "authors": [
  //         "Harmeet Singh",
  //         "Mehul Bhatt"
  //     ],
  //     "publishedDate": "2016-12-30",
  //     "description": "Build real-time responsive web apps using React and BootstrapAbout This Book* Showcase the power of React-Bootstrap through real-world examples* Explore the benefits of integrating React with various frameworks and APIs* See the benefits of using the latest frameworks to make your web development experience enchantingWho This Book Is ForThis book is for anybody who is interested in modern web development and has intermediate knowledge of HTML, CSS, and JavaScript. Basic knowledge of any JavaScript MVC framework would also be helpful.What You Will Learn* See how to integrate React-Bootstrap with React* Explore the Redux architecture and understand its benefits* Build a custom responsive theme* Easily interact with DOM on your web browser* Appreciate the advantages of using JSX* Get acquainted with the various routing methods in React* Integrate external APIs into ReactIn DetailReact-Bootstrap is one of the most popular front-end frameworks, and integrating it with React allows web developers to write much cleaner code. This book will help you gain a thorough understanding of the React-Bootstrap framework and show you how to build impressive web apps.In this book, you will get an overview of the features of React-Bootstrap and ReactJS, along with the integration of ReactJS components with ReactJS. You will understand the benefits of using JSX and the Redux architecture. The server-side rendering of React will also be shown. All the concepts are explained by developing real-world examples.By the end of this book, you will be equipped to create responsive web applications using React-Bootstrap with ReactJS, and will have an insight into the best practices.",
  //     "industryIdentifiers": [
  //         {
  //             "type": "ISBN_10",
  //             "identifier": "1786462494"
  //         },
  //         {
  //             "type": "ISBN_13",
  //             "identifier": "9781786462497"
  //         }
  //     ],
  //     "readingModes": {
  //         "text": false,
  //         "image": false
  //     },
  //     "pageCount": 278,
  //     "printType": "BOOK",
  //     "maturityRating": "NOT_MATURE",
  //     "allowAnonLogging": false,
  //     "contentVersion": "preview-1.0.0",
  //     "panelizationSummary": {
  //         "containsEpubBubbles": false,
  //         "containsImageBubbles": false
  //     },
  //     "imageLinks": {
  //         "smallThumbnail": "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  //         "thumbnail": "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  //     },
  //     "language": "en",
  //     "previewLink": "http://books.google.com/books?id=sJf1vQAACAAJ&dq=redux+react&hl=&cd=6&source=gbs_api",
  //     "infoLink": "http://books.google.com/books?id=sJf1vQAACAAJ&dq=redux+react&hl=&source=gbs_api",
  //     "canonicalVolumeLink": "https://books.google.com/books/about/Learning_Web_Development_with_React_and.html?hl=&id=sJf1vQAACAAJ",
  //     "id": "sJf1vQAACAAJ",
  //     "shelf": "currentlyReading"
  // },
  // {
  //     "title": "The Cuckoo's Calling",
  //     "authors": [
  //         "Robert Galbraith"
  //     ],
  //     "publisher": "Mulholland Books",
  //     "publishedDate": "2013-04-30",
  //     "description": "A brilliant debut mystery in a classic vein: Detective Cormoran Strike investigates a supermodel's suicide. After losing his leg to a land mine in Afghanistan, Cormoran Strike is barely scraping by as a private investigator. Strike is down to one client, and creditors are calling. He has also just broken up with his longtime girlfriend and is living in his office. Then John Bristow walks through his door with an amazing story: His sister, thelegendary supermodel Lula Landry, known to her friends as the Cuckoo, famously fell to her death a few months earlier. The police ruled it a suicide, but John refuses to believe that. The case plunges Strike into the world of multimillionaire beauties, rock-star boyfriends, and desperate designers, and it introduces him to every variety of pleasure, enticement, seduction, and delusion known to man. You may think you know detectives, but you've never met one quite like Strike. You may think you know about the wealthy and famous, but you've never seen them under an investigation like this. Introducing Cormoran Strike, this is the acclaimed first crime novel by J.K. Rowling, writing under the pseudonym Robert Galbraith.",
  //     "industryIdentifiers": [
  //         {
  //             "type": "ISBN_13",
  //             "identifier": "9780316206860"
  //         },
  //         {
  //             "type": "ISBN_10",
  //             "identifier": "0316206865"
  //         }
  //     ],
  //     "readingModes": {
  //         "text": true,
  //         "image": false
  //     },
  //     "pageCount": 464,
  //     "printType": "BOOK",
  //     "categories": [
  //         "Fiction"
  //     ],
  //     "averageRating": 3.5,
  //     "ratingsCount": 3037,
  //     "maturityRating": "NOT_MATURE",
  //     "allowAnonLogging": true,
  //     "contentVersion": "1.21.20.0.preview.2",
  //     "panelizationSummary": {
  //         "containsEpubBubbles": false,
  //         "containsImageBubbles": false
  //     },
  //     "imageLinks": {
  //         "smallThumbnail": "http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
  //         "thumbnail": "http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  //     },
  //     "language": "en",
  //     "previewLink": "http://books.google.com/books?id=evuwdDLfAyYC&printsec=frontcover&dq=rowling&hl=&cd=4&source=gbs_api",
  //     "infoLink": "https://play.google.com/store/books/details?id=evuwdDLfAyYC&source=gbs_api",
  //     "canonicalVolumeLink": "https://market.android.com/details?id=book-evuwdDLfAyYC",
  //     "id": "evuwdDLfAyYC",
  //     "shelf": "wantToRead"
  // },
  // {
  //     "title": "Lords of Finance",
  //     "subtitle": "The Bankers Who Broke the World",
  //     "authors": [
  //         "Liaquat Ahamed"
  //     ],
  //     "publisher": "Penguin",
  //     "publishedDate": "2009-01",
  //     "description": "Argues that the stock market crash of 1929 and subsequent Depression occurred as a result of poor decisions on the part of four central bankers who jointly attempted to reconstruct international finance by reinstating the gold standard.",
  //     "industryIdentifiers": [
  //         {
  //             "type": "ISBN_10",
  //             "identifier": "159420182X"
  //         },
  //         {
  //             "type": "ISBN_13",
  //             "identifier": "9781594201820"
  //         }
  //     ],
  //     "readingModes": {
  //         "text": false,
  //         "image": false
  //     },
  //     "pageCount": 564,
  //     "printType": "BOOK",
  //     "categories": [
  //         "Business & Economics"
  //     ],
  //     "averageRating": 4.5,
  //     "ratingsCount": 14,
  //     "maturityRating": "NOT_MATURE",
  //     "allowAnonLogging": false,
  //     "contentVersion": "1.0.0.0.preview.0",
  //     "imageLinks": {
  //         "smallThumbnail": "http://books.google.com/books/content?id=74XNzF_al3MC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
  //         "thumbnail": "http://books.google.com/books/content?id=74XNzF_al3MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  //     },
  //     "language": "en",
  //     "previewLink": "http://books.google.com/books?id=74XNzF_al3MC&printsec=frontcover&dq=finance&hl=&cd=1&source=gbs_api",
  //     "infoLink": "http://books.google.com/books?id=74XNzF_al3MC&dq=finance&hl=&source=gbs_api",
  //     "canonicalVolumeLink": "https://books.google.com/books/about/Lords_of_Finance.html?hl=&id=74XNzF_al3MC",
  //     "id": "74XNzF_al3MC",
  //     "shelf": "wantToRead"
  // },
  // {
  //     "title": "Needful Things",
  //     "authors": [
  //         "Stephen King"
  //     ],
  //     "publisher": "Simon and Schuster",
  //     "publishedDate": "2016-05-03",
  //     "description": "Now available for the first time in a mass-market premium paperback edition—master storyteller Stephen King presents the classic #1 New York Times bestseller about a mysterious store than can sell you whatever you desire—but not without exacting a terrible price in return. “There are two prices for this. Half…and half. One half is cash. The other is a deed. Do you understand?” The town of Castle Rock, Maine has seen its fair share of oddities over the years, but nothing is a peculiar as the little curio shop that’s just opened for business. Its mysterious proprietor, Leland Gaunt, seems to have something for everyone out on display at Needful Things…interesting items that run the gamut from worthless to priceless. Nothing has a price tag in this place, but everything is certainly for sale. The heart’s desire for any resident of Castle Rock can easily be found among the curiosities…in exchange for a little money and—at the specific request of Leland Gaunt—a whole lot of menace against their fellow neighbors. Everyone in town seems willing to make a deal at Needful Things, but the devil is in the details. And no one takes heed of the little sign handing on the wall: Caveat emptor. In other words, let the buyer beware…",
  //     "industryIdentifiers": [
  //         {
  //             "type": "ISBN_13",
  //             "identifier": "9781501143786"
  //         },
  //         {
  //             "type": "ISBN_10",
  //             "identifier": "1501143786"
  //         }
  //     ],
  //     "readingModes": {
  //         "text": false,
  //         "image": false
  //     },
  //     "pageCount": 960,
  //     "printType": "BOOK",
  //     "categories": [
  //         "Fiction"
  //     ],
  //     "averageRating": 3.5,
  //     "ratingsCount": 28,
  //     "maturityRating": "NOT_MATURE",
  //     "allowAnonLogging": false,
  //     "contentVersion": "1.3.1.0.preview.0",
  //     "imageLinks": {
  //         "smallThumbnail": "http://books.google.com/books/content?id=jAUODAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
  //         "thumbnail": "http://books.google.com/books/content?id=jAUODAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  //     },
  //     "language": "en",
  //     "previewLink": "http://books.google.com/books?id=jAUODAAAQBAJ&printsec=frontcover&dq=king&hl=&cd=8&source=gbs_api",
  //     "infoLink": "http://books.google.com/books?id=jAUODAAAQBAJ&dq=king&hl=&source=gbs_api",
  //     "canonicalVolumeLink": "https://books.google.com/books/about/Needful_Things.html?hl=&id=jAUODAAAQBAJ",
  //     "id": "jAUODAAAQBAJ",
  //     "shelf": "read"
  // },
  // {
  //     "title": "React",
  //     "subtitle": "Die praktische Einführung in React, React Router und Redux",
  //     "authors": [
  //         "Nils Hartmann",
  //         "Oliver Zeigermann"
  //     ],
  //     "publisher": "dpunkt.verlag",
  //     "publishedDate": "2016-07-07",
  //     "description": "React ist ein JavaScript-Framework zur Entwicklung von Benutzeroberflächen sowohl im Browser als auch auf Mobilgeräten. Entwickelt und eingesetzt von Facebook ist es mittlerweile als Open-Source-Projekt verfügbar und hat sich bereits im Einsatz bei diversen namhaften Websites, wie z. B. Airbnb und Netflix, bewährt. Dieses Buch stellt Ihnen die Konzepte von React, React Router und Redux anhand eines durchgehenden Beispiels vor. Sie lernen, wie Sie mit React wiederverwendbare UI-Komponenten entwickeln und wie Sie auf Basis der einzelnen Komponenten ganze Anwendungen zusammenbauen. Unter anderem werden folgende Themen behandelt: - Entwickeln und Testen eigener React-Komponenten auf Basis des JavaScript-Standards ECMAScript 2015 (ES6) - Routing mit dem React Router - Das Architektur-Modell Flux und wie damit komplette Anwendungen umgesetzt werden (am Beispiel des Redux-Frameworks) - Serverseitiges Rendern von React-Komponenten und -Anwendungen - Anbindung eines REST-Backends Die im Buch eingesetzten Sprachfeatures aus ES6 werden in einem eigenen Kapitel vorgestellt, sodass zum Verständnis des Buches Kenntnisse von ES5 ausreichen. Nach der Lektüre des Buches werden Sie in der Lage sein, eigene Projekte mit React umzusetzen.",
  //     "industryIdentifiers": [
  //         {
  //             "type": "ISBN_13",
  //             "identifier": "9783864919640"
  //         },
  //         {
  //             "type": "ISBN_10",
  //             "identifier": "3864919649"
  //         }
  //     ],
  //     "readingModes": {
  //         "text": true,
  //         "image": false
  //     },
  //     "pageCount": 342,
  //     "printType": "BOOK",
  //     "categories": [
  //         "Computers"
  //     ],
  //     "maturityRating": "NOT_MATURE",
  //     "allowAnonLogging": true,
  //     "contentVersion": "1.4.3.0.preview.2",
  //     "panelizationSummary": {
  //         "containsEpubBubbles": false,
  //         "containsImageBubbles": false
  //     },
  //     "imageLinks": {
  //         "smallThumbnail": "http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  //         "thumbnail": "http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  //     },
  //     "language": "de",
  //     "previewLink": "http://books.google.com/books?id=IOejDAAAQBAJ&dq=redux+react&hl=&cd=15&source=gbs_api",
  //     "infoLink": "http://books.google.com/books?id=IOejDAAAQBAJ&dq=redux+react&hl=&source=gbs_api",
  //     "canonicalVolumeLink": "https://books.google.com/books/about/React.html?hl=&id=IOejDAAAQBAJ",
  //     "id": "IOejDAAAQBAJ",
  //     "shelf": "read"
  // },
  // {
  //     "title": "Satire TV",
  //     "subtitle": "Politics and Comedy in the Post-Network Era",
  //     "authors": [
  //         "Jonathan Gray",
  //         "Jeffrey P. Jones",
  //         "Ethan Thompson"
  //     ],
  //     "publisher": "NYU Press",
  //     "publishedDate": "2009-04-01",
  //     "description": "Satirical TV has become mandatory viewing for citizens wishing to make sense of the bizarre contemporary state of political life. Shifts in industry economics and audience tastes have re-made television comedy, once considered a wasteland of escapist humor, into what is arguably the most popular source of political critique. From fake news and pundit shows to animated sitcoms and mash-up videos, satire has become an important avenue for processing politics in informative and entertaining ways, and satire TV is now its own thriving, viable television genre. Satire TV examines what happens when comedy becomes political, and politics become funny. A series of original essays focus on a range of programs, from The Daily Show to South Park, Da Ali G Show to The Colbert Report, The Boondocks to Saturday Night Live, Lil’ Bush to Chappelle’s Show, along with Internet D.I.Y. satire and essays on British and Canadian satire. They all offer insights into what today’s class of satire tells us about the current state of politics, of television, of citizenship, all the while suggesting what satire adds to the political realm that news and documentaries cannot.",
  //     "industryIdentifiers": [
  //         {
  //             "type": "ISBN_10",
  //             "identifier": "081473216X"
  //         },
  //         {
  //             "type": "ISBN_13",
  //             "identifier": "9780814732168"
  //         }
  //     ],
  //     "readingModes": {
  //         "text": true,
  //         "image": false
  //     },
  //     "pageCount": 288,
  //     "printType": "BOOK",
  //     "categories": [
  //         "Performing Arts"
  //     ],
  //     "maturityRating": "NOT_MATURE",
  //     "allowAnonLogging": true,
  //     "contentVersion": "0.6.4.0.preview.2",
  //     "panelizationSummary": {
  //         "containsEpubBubbles": false,
  //         "containsImageBubbles": false
  //     },
  //     "imageLinks": {
  //         "smallThumbnail": "http://books.google.com/books/content?id=1wy49i-gQjIC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
  //         "thumbnail": "http://books.google.com/books/content?id=1wy49i-gQjIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  //     },
  //     "language": "en",
  //     "previewLink": "http://books.google.com/books?id=1wy49i-gQjIC&printsec=frontcover&dq=satire&hl=&cd=3&source=gbs_api",
  //     "infoLink": "https://play.google.com/store/books/details?id=1wy49i-gQjIC&source=gbs_api",
  //     "canonicalVolumeLink": "https://market.android.com/details?id=book-1wy49i-gQjIC",
  //     "id": "1wy49i-gQjIC",
  //     "shelf": "read"
  // }