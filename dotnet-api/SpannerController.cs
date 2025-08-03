using Google.Cloud.Spanner.Data;
using Google.Cloud.SecretManager.V1;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SpannerController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetData()
    {
        string projectId = "my-new-project-for-ramzanx";
        string secretName = "spanner-conn-string";

        var secretClient = SecretManagerServiceClient.Create();
        var secret = secretClient.AccessSecretVersion(
            SecretVersionName.FromProjectSecretSecretVersion(projectId, secretName, "latest"));
        string connString = secret.Payload.Data.ToStringUtf8();

        using var connection = new SpannerConnection(connString);
        await connection.OpenAsync();

        var cmd = connection.CreateSelectCommand("SELECT * FROM your_table");
        using var reader = await cmd.ExecuteReaderAsync();
        var results = new List<string>();
        while (await reader.ReadAsync())
        {
            results.Add(reader.GetFieldValue<string>(0));
        }

        return Ok(results);
    }
}

