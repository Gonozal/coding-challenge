# Fides Coding-Challenge

## Start the app 

To start the API development server run `nx serve api`. Open your browser and navigate to http://localhost:3000/.

To start the Web development server run `nx serve frontend`. Open your browser and navigate to http://localhost:4200/.

## Scope

This is a small time-tracking applications.

Scope:

  - Users should be able to log in (for now: select a user)
  - Users should be able to start and stop time tracking events
  - Users should be able to see time tracking events in a day-by-day timeline


## Additional Info

I took this as an excuse to learn more about a few aspects of both NestJS and NextJS.

### NestJS

I was primarily interested in unit- and e2e-Testing, something I've not personally done much of in the past.

There's also [Async Local Storage](https://github.com/Papooch/nestjs-cls) which I wanted to experiment with to reduce the number of context-props like UserIDs, token, etc. that need to be passed through multiple levels of methods.

Here my Experience has overall been great. 

While I think that some **unit-tests** don't assert useful things and rely on implementation 
details too much, I'd argue that it's hard to properly test a method in isolation that does nothing except passing attributes to another method. 

**NestJS-CLS** was fairly easy to set up, integrates well with the DI framework that Nest uses and was also easy to integrate into tests.


### NextJS

I wanted to look more into the newer additions to the app router. In particular, I wanted to see how far I can take Next with javascript disabled. To still be able to use forms, and "url-stable" modals, I used 2 new features: [Parallel Routing](https://github.com/vercel/next.js/issues/49662) and [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions). 

While the concept I think is great, the implementation is still a little clunk.

**Server-Actions** are a great way to handle form submission without any javascript, but for more complex use-cases, they become troublesome. E.g. fetched data is not automatically refreshed after a server-action. Even using [revalidate](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating) didn't work they way I tried it. There's always [refresh](https://nextjs.org/docs/app/api-reference/functions/use-router), but that requires using a client-component and also does not work out of the box if a redirect is happening as the result of the form action, like during a user login.

**Parallel (and intercepted) routes** have [issues](https://github.com/vercel/next.js/issues/49662) un-mounting during soft navigation. They also require a restart of the dev-server to properly update

**ZOD** In Progress

Overall I think both of these approaches could be very valuable for e-commerce or other fields where SEO is one of the highest priorities, a few 100 milliseconds more or less TTI matters and users primarily interact with the website through mobile phones. Especially since here, client-side request-cascades can cause real performance issues.

For typical Desktop/Laptop optimized B2B apps, I feel like the added complexity required isn't worth it (at least in the current state)