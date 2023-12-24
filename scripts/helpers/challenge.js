import * as cheerio from "cheerio";
import * as async from "./http-client.js";

export class CodeWarsKata {
  static client = new async.HttpClient("https://www.codewars.com");

  /** @type {string} */
  #page;

  /** @param {string} id  Challenge unique identifier. */
  constructor(id) {
    this.meta = /** @type {CodeWarsKataMeta} */ ({
      id,
    });
    this.endpoints = /** @type {CodeWarsEndpoints} */ ({
      metadata: `/api/v1/code-challenges/${id}`,
      kata: `/kata/${id}/train/javascript`,
    });
  }

  async init() {
    /** @type {async.HttpResponse<CodeWarsKataMeta>} */
    const metaResponse = await CodeWarsKata.client.getJson(this.endpoints.metadata);
    this.meta = metaResponse.body;

    const pageResponse = await CodeWarsKata.client.get(this.endpoints.kata);
    const cookies = pageResponse.headers.getSetCookie();
    this.#page = pageResponse.body;
    this.authorization = cookies.join(";");

    const $ = cheerio.load(this.#page);
    const script = $("script").last().text();
    this.currentUser = this.getCurrentUser(script);
    Object.assign(this.endpoints, this.getRoutes(script));

    this.session = await this.getSetup();
  }

  getMainFunctionName() {
    const startString = "function ";
    const start = this.session.setup.indexOf(startString) + startString.length;
    const endString = "(";
    const end = this.session.setup.indexOf(endString);

    return this.session.setup.substring(start, end).trim();
  }

  getParams() {
    const startString = "(";
    const start = this.session.setup.indexOf(startString) + startString.length;
    const endString = ")";
    const end = this.session.setup.indexOf(endString);

    return this.session.setup.substring(start, end).split(",");
  }

  /**
   * @param {string} script
   * @returns {CodeWarsCurrentUser}
   */
  getCurrentUser(script) {
    const startString = `const currentUser = JSON.parse(`;
    const start = script.indexOf(startString) + startString.length;
    const endString = `,\\"experience\\"`;
    const end = script.indexOf(endString);
    const raw = /** @type {string} */ (JSON.parse(script.substring(start, end) + `}"`));

    return JSON.parse(raw);
  }

  /**
   * @param {string} script
   * @returns {CodeWarsCurrentUser}
   */
  getRoutes(script) {
    const startString = "routes: ";
    const start = script.indexOf(startString) + startString.length;
    const endString = "pageControllerName:";
    const end = script.indexOf(endString) - 6;
    const raw = script.substring(start, end).replaceAll("%7Blanguage%7D", "javascript");

    return JSON.parse(raw);
  }

  async getSetup() {
    /** @type {async.HttpResponse<CodeWarsSession>} */
    const response = await CodeWarsKata.client.postJson(this.endpoints.session, {
      headers: {
        "authorization": this.currentUser.jwt,
        "cookie": this.authorization,
        "x-csrf-token": decodeURIComponent(
          this.authorization.substring(
            this.authorization.indexOf("=") + 1,
            this.authorization.indexOf(";"),
          ),
        ),
      },
    });

    return response.body;
  }
}

/**
 * @typedef {Object} CodeWarsKataMeta
 * @property {string}                        id                  The unique identifier of the
 *                                                               CodeWars kata.
 * @property {string}                        name                The name of the CodeWars kata.
 * @property {string}                        slug                The slug of the CodeWars kata.
 * @property {string}                        category            The category of the CodeWars kata.
 * @property {string}                        publishedAt         The date and time when the kata was
 *                                                               published.
 * @property {string}                        approvedAt          The date and time when the kata was
 *                                                               approved.
 * @property {string[]}                      languages           An array of programming languages
 *                                                               supported by the kata.
 * @property {string}                        url                 The URL of the CodeWars kata.
 * @property {CodeWarsRank}                  rank                The rank information of the kata.
 * @property {string}                        createdAt           The date and time when the kata was
 *                                                               created.
 * @property {CodeWarsAuthor}                createdBy           Information about the user who
 *                                                               created the kata.
 * @property {Object}                        approvedBy          Information about the user who
 *                                                               approved the kata.
 * @property {string}                        username            The username of the approver.
 * @property {string}                        url                 The URL of the approver's profile.
 * @property {string}                        description         The description of the CodeWars
 *                                                               kata.
 * @property {number}                        totalAttempts       The total number of attempts on the
 *                                                               kata.
 * @property {number}                        totalCompleted      The total number of users who
 *                                                               completed the kata.
 * @property {number}                        totalStars          The total number of stars received
 *                                                               by the kata.
 * @property {number}                        voteScore           The vote score of the kata.
 * @property {string[]}                      tags                An array of tags associated with
 *                                                               the kata.
 * @property {boolean}                       contributorsWanted  Indicates whether contributors are
 *                                                               wanted for the kata.
 * @property {CodeWarsKataUnresolvedDetails} unresolved          Information about unresolved issues
 *                                                               and suggestions.
 */

/**
 * An object with rank information.
 *
 * @typedef {Object} CodeWarsRank
 * @property {number} id     The unique identifier of the rank.
 * @property {string} name   The name of the rank.
 * @property {string} color  The color associated with the rank.
 */

/**
 * A CodeWars author.
 *
 * @typedef {Object} CodeWarsAuthor
 * @property {string} username  The username of the creator.
 * @property {string} url       The URL of the creator's profile.
 */

/**
 * @typedef {Object} CodeWarsKataUnresolvedDetails
 * @property {number} issues       The number of unresolved issues.
 * @property {number} suggestions  The number of unresolved suggestions.
 */

/**
 * @typedef {Object} CodeWarsCurrentUser
 * @property {string}   username
 * @property {null}     email
 * @property {string}   role
 * @property {boolean}  guest
 * @property {number}   honor
 * @property {number}   rank
 * @property {null}     bootcamp_interest
 * @property {null}     career_paths
 * @property {null}     andela_interest
 * @property {null}     phone
 * @property {string}   current_language
 * @property {null}     country_name
 * @property {string[]} blocked_user_ids
 * @property {string[]} blocked_by_user_ids
 * @property {string}   jwt
 */

/** @typedef {Union<CodeWarsRoutes, { kata: string; metadata: string }>} CodeWarsEndpoints */

/**
 * @template T
 * @template U
 * @typedef {T & U} Union
 */

/**
 * @typedef {Object} CodeWarsRoutes
 * @property {string} user_profile
 * @property {string} user_stars
 * @property {string} star_code_challenge
 * @property {string} mark_notifications_read
 * @property {string} unread_popup_notifications
 * @property {string} collections
 * @property {string} collection_code_challenge
 * @property {string} session
 * @property {string} notify
 * @property {string} finalize
 * @property {string} skip
 * @property {string} report
 * @property {string} comments
 * @property {string} solutions
 * @property {string} editor
 * @property {string} forfeit
 */

/**
 * @typedef {Object} CodeWarsSession
 * @property {boolean}                   success
 * @property {string}                    languageName
 * @property {string}                    label
 * @property {string}                    solutionId
 * @property {string}                    icon
 * @property {string}                    setup
 * @property {string}                    exampleFixture
 * @property {null}                      workingCode
 * @property {null}                      workingFixture
 * @property {null}                      recentlyAttempted
 * @property {string}                    activeVersion
 * @property {CodeWarsLanguageVersion[]} languageVersions
 * @property {string}                    testFramework
 * @property {string}                    package
 * @property {string}                    fixture
 */

/**
 * @typedef {Object} CodeWarsLanguageVersion
 * @property {string}  id
 * @property {string}  label
 * @property {boolean} supported
 */
