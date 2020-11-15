# csc560_unitThree

Welcome to the football player api. You have the following parameters upon which to query:
firstName, lastName, rushingYards, passTDs, catchesMade, missedFG, sacks.

Players can be added and updated via the HTTP method of POST. They can be deleted via DELETE. Players can be queried via GET.

Queries for the following stats are available. Note the parameter names in parens:
most passing TDS (tdMax)
most sacks (sackMax)
most rushing yards (rushMax)
least rushing yards (rushMin)
missed field goals (fgMax)
most passing yards (passMax)

Endpoints are as follows:
base:http://127.0.0.1:8081/api/v1.1
update: /player/update
add: /player/add
delete: /player/delete
query: /player/query
