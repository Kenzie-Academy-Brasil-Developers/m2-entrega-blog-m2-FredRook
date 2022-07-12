import ComponentsDom from "../Models/Header.Users.Models.js";
import UserRequest from "./User.Controllers.js";

ComponentsDom.header();
ComponentsDom.modalLogin();
await ComponentsDom.posts();
await ComponentsDom.returnCardsForEach();
