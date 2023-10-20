const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var jsonParser = bodyParser.json();
// app.post("/getFrameList", jsonParser, (req, res) => {
//   console.log("Just got a request!");
//   var input = req.body.content;

//   var decodedJSON = JSON.parse(JSON.stringify(input));
//   console.log(decodedJSON);
//   res.send(decodedJSON);
// });

var urls = ["https://voxxio.io", "https://voxxio.io/version-test"];
app.post(
  "/test/subscription/updating_credits",
  jsonParser,
  async (req, res) => {
    console.log("Just got a request!");
    var input = req.body;
    if (input.meta.event_name == "subscription_updated") {
      var response = await fetch(
        `${urls[1]}/api/1.1/obj/user?constraints=[{\"key\":\"_all\",\"constraint_type\":\"contains\",\"value\":\"${input.data.attributes.user_email}\"}]`,

        {
          headers: {
            Host: "voxxio.io",
            Authorization: "Bearer a025de2b81c1cc96adee895cf4b63fc3",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (result !== null && result !== undefined) {
        var subId =
          result.response.results[0].subscription_info_custom_payments_data;
        console.log(subId);
        if (subId !== undefined) {
          var subRes = await fetch(
            `${urls[1]}/api/1.1/obj/subscription_info/${subId}`,
            {
              headers: {
                Host: "voxxio.io",
                Authorization: "Bearer a025de2b81c1cc96adee895cf4b63fc3",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          const subResult = await subRes.json();
          console.log(subResult);
          if (
            subResult.response.prev_plan_text ===
            input.data.attributes.product_name
          ) {
            if (
              subResult.response.plan_status_option_plan_status_os ===
                "cancelled" &&
              input.data.attributes.cancelled !== true
            ) {
              console.log("ACTIVATED EVENT");
              //! DONT DO ANYTHING
              input.meta.event_name = "subscription_activated";

              var bubbleWfReqCancelledEvent = await fetch(
                `${urls[1]}/api/1.1/wf/updating_credits`,
                {
                  method: "POST",
                  // mode: "cors",
                  headers: { "Content-type": "application/json" },

                  body: JSON.stringify(input),
                }
              );
              if (bubbleWfReqCancelledEvent.json() != undefined) {
                res.send();
              }
            } else {
              console.log("CANCELLED EVENT");
              //? SEND WEBHOOK OBJECT TO BUBBLE WITH event_name set to subscription_cancelled
              input.meta.event_name = "subscription_cancelled";

              var bubbleWfReqCancelledEvent = await fetch(
                `${urls[1]}/api/1.1/wf/updating_credits`,
                {
                  method: "POST",
                  // mode: "cors",
                  headers: { "Content-type": "application/json" },

                  body: JSON.stringify(input),
                }
              );
              if (bubbleWfReqCancelledEvent.json() != undefined) {
                res.send();
              }
            }
          } else {
            console.log("PLAN NOT SAME");
            //? SEND WEBHOOK OBJECT TO BUBBLE AS IS
            var bubbleWfReqCancelledEvent = await fetch(
              `${urls[1]}/api/1.1/wf/updating_credits`,
              {
                method: "POST",
                // mode: "cors",
                headers: { "Content-type": "application/json" },

                body: JSON.stringify(input),
              }
            );
            console.log(bubbleWfReqCancelledEvent.body);
            if (bubbleWfReqCancelledEvent.json() != undefined) {
              res.send();
            }
          }
        }
      } else {
        console.log(res);
      }
    } else {
      var bubbleWfReqCancelledEvent = await fetch(
        `${urls[1]}/api/1.1/wf/updating_credits`,
        {
          method: "POST",
          // mode: "cors",
          headers: { "Content-type": "application/json" },

          body: JSON.stringify(input),
        }
      );
      console.log(bubbleWfReqCancelledEvent.body);
      if (bubbleWfReqCancelledEvent.json() != undefined) {
        res.send();
      }
    }
    res.send();
  }
);
app.post("/subscription/updating_credits", jsonParser, async (req, res) => {
  console.log("Just got a request!");
  var input = req.body;
  if (input.meta.event_name == "subscription_updated") {
    var response = await fetch(
      `${urls[0]}/api/1.1/obj/user?constraints=[{\"key\":\"_all\",\"constraint_type\":\"contains\",\"value\":\"${input.data.attributes.user_email}\"}]`,

      {
        headers: {
          Host: "voxxio.io",
          Authorization: "Bearer a025de2b81c1cc96adee895cf4b63fc3",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const result = await response.json();
    console.log(result);
    if (result !== null && result !== undefined) {
      var subId =
        result.response.results[0].subscription_info_custom_payments_data;
      console.log(subId);
      if (subId !== undefined) {
        var subRes = await fetch(
          `${urls[0]}/api/1.1/obj/subscription_info/${subId}`,
          {
            headers: {
              Host: "voxxio.io",
              Authorization: "Bearer a025de2b81c1cc96adee895cf4b63fc3",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        const subResult = await subRes.json();
        console.log(subResult);
        if (
          subResult.response.prev_plan_text ===
          input.data.attributes.product_name
        ) {
          if (
            subResult.response.plan_status_option_plan_status_os ===
              "cancelled" &&
            input.data.attributes.cancelled !== true
          ) {
            console.log("ACTIVATED EVENT");
            //! DONT DO ANYTHING
            input.meta.event_name = "subscription_activated";

            var bubbleWfReqCancelledEvent = await fetch(
              `${urls[0]}/api/1.1/wf/updating_credits`,
              {
                method: "POST",
                // mode: "cors",
                headers: { "Content-type": "application/json" },

                body: JSON.stringify(input),
              }
            );
            if (bubbleWfReqCancelledEvent.json() != undefined) {
              res.send();
            }
          } else {
            console.log("CANCELLED EVENT");
            //? SEND WEBHOOK OBJECT TO BUBBLE WITH event_name set to subscription_cancelled
            input.meta.event_name = "subscription_cancelled";

            var bubbleWfReqCancelledEvent = await fetch(
              `${urls[0]}/api/1.1/wf/updating_credits`,
              {
                method: "POST",
                // mode: "cors",
                headers: { "Content-type": "application/json" },

                body: JSON.stringify(input),
              }
            );
            if (bubbleWfReqCancelledEvent.json() != undefined) {
              res.send();
            }
          }
        } else {
          console.log("PLAN NOT SAME");
          //? SEND WEBHOOK OBJECT TO BUBBLE AS IS
          var bubbleWfReqCancelledEvent = await fetch(
            `${urls[0]}/api/1.1/wf/updating_credits`,
            {
              method: "POST",
              // mode: "cors",
              headers: { "Content-type": "application/json" },

              body: JSON.stringify(input),
            }
          );
          console.log(bubbleWfReqCancelledEvent.body);
          if (bubbleWfReqCancelledEvent.json() != undefined) {
            res.send();
          }
        }
      }
    } else {
      console.log(res);
    }
  } else {
    var bubbleWfReqCancelledEvent = await fetch(
      `${urls[0]}/api/1.1/wf/updating_credits`,
      {
        method: "POST",
        // mode: "cors",
        headers: { "Content-type": "application/json" },

        body: JSON.stringify(input),
      }
    );
    console.log(bubbleWfReqCancelledEvent.body);
    if (bubbleWfReqCancelledEvent.json() != undefined) {
      res.send();
    }
  }
  res.send();
});
app.listen(process.env.PORT || 3000);
