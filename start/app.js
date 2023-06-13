module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Export providers array
  |--------------------------------------------------------------------------
  |
  | List of providers to export and register inside IoC container.
  |
  */
  providers,

  /*
  |--------------------------------------------------------------------------
  | Export aliases object
  |--------------------------------------------------------------------------
  |
  | Aliases are short unique names for IoC container bindings. You are free
  | to create your own aliases.
  |
  | ```
  | {
  |   View: 'Adonis/Src/View',
  |   Response: 'Adonis/Src/Response'
  | }
  | ```
  |
  */
  aliases: {
    Auth: 'Adonis/Addons/Auth',
  },
}
