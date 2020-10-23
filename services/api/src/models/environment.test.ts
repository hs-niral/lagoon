import { EnvironmentModel } from "./environment";

import aLegacy from "./mockHitDataLegacy-project-a.json";
import bNew from "./mockHitDataNew-project-b.json";
import cLegacyPartial from "./mockHitDataLegacy-project-c.json";
import cNewPartial from "./mockHitDataNew-project-c.json"



// const esClient = {
//   search: () => { hits: { total: {value: 999 } }}
// }
// const environmentModel = EnvironmentModel({esClient});




import esClient from '../clients/esClient';



// Unit Under Test
describe('Environment Data', () => {

  describe('Hits', () => {
    // scenarios and expectation
    it('When using the legacy logging system, then the hits should be 4461658', async () => {
      // Arrange
      esClient.search = async (obj) => {
        return aLegacy;
      }
      const environmentModel = EnvironmentModel({esClient});
      const openshiftProjectName = "test-prod";
      const month = "2020-10"
      const projectName = "test"

      // Act
      const hits = await environmentModel.environmentHitsMonthByEnvironmentId(projectName, openshiftProjectName, month);

      // Assert
      expect(hits.total).toBe(4461658);
    });

    // scenarios and expectation
    it('When using the new logging system, then the hits should be ', async () => {
      // Arrange
      esClient.search = async (obj) => {
        return bNew;
      }
      const environmentModel = EnvironmentModel({esClient});
      const openshiftProjectName = "test-prod";
      const month = "2020-10"
      const projectName = "test"

      // Act
      const hits = await environmentModel.environmentHitsMonthByEnvironmentId(projectName, openshiftProjectName, month);

      // Assert
      expect(hits.total).toBe(138934);
    });



    // scenarios and expectation
    it('When a project uses both the new and legacy logging system, then the hits should be ', async () => {
      // Arrange
      const openshiftProjectName = "test-partial-prod";
      esClient.search = async (obj) => {
        if (obj.index === `router-logs-${openshiftProjectName}-*`){
          return cLegacyPartial;
        }
        if (obj.index === `router-logs-${projectName}-_-*`){
          return cNewPartial;
        }
        return {}
      }
      const environmentModel = EnvironmentModel({esClient});
      const month = "2020-10"
      const projectName = "test"

      // Act
      const hits = await environmentModel.environmentHitsMonthByEnvironmentId(projectName, openshiftProjectName, month);

      // Assert
      expect(hits.total).toBe(4461658);
    });

  });

}); // End Unit Under Test