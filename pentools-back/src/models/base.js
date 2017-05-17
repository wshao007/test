export const BaseModel = {
  config: {
    underscored: true,
    paranoid: true,
    instanceMethods: {
      getData: function () {
        return this.get({
          plain: true
        });
      }
    }
  }
}
